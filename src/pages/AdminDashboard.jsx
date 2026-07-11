import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllAssets, getAllIssues, updateIssueStatus, assignTechnician } from "../firebasecode/Firebase";
import Navbar from "../components/navbar/Navbar";
import Isshucard from "../components/assetscard/isshucard/Isshucard";
import Footer from "../components/footer/Footer";

const TECHNICIANS = ["Unassigned", "Ali", "Zeeshan", "Bilal", "Hamza"];

function AdminDashboard() {
  const [issues, setIssues] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assetSearch, setAssetSearch] = useState("");
  const [issueSearch, setIssueSearch] = useState("");

  const loadData = useCallback(async () => {
    try {
      const [assetData, issueData] = await Promise.all([getAllAssets(), getAllIssues()]);
      setAssets(assetData);
      setIssues(issueData);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadData();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadData]);

  const handleStatusChange = async (issueId, newStatus, assetId, note) => {
    try {
      await updateIssueStatus(issueId, newStatus, assetId, note);
      await loadData();
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleAssignChange = async (issueId, technicianName) => {
    try {
      await assignTechnician(issueId, technicianName);
      await loadData();
    } catch (err) {
      console.error(err.message);
    }
  };

  const pendingIssues = issues.filter((issue) => issue.status !== "Resolved" && issue.status !== "Closed").length;
  const resolvedIssues = issues.filter((issue) => issue.status === "Resolved" || issue.status === "Closed").length;

  const filteredAssets = assets.filter((asset) => {
    const query = assetSearch.toLowerCase();
    return (
      asset.name?.toLowerCase().includes(query) ||
      asset.category?.toLowerCase().includes(query) ||
      asset.location?.toLowerCase().includes(query) ||
      asset.assetCode?.toLowerCase().includes(query)
    );
  });

  const filteredIssues = issues.filter((issue) => {
    const query = issueSearch.toLowerCase();
    return (
      issue.title?.toLowerCase().includes(query) ||
      issue.category?.toLowerCase().includes(query) ||
      issue.status?.toLowerCase().includes(query) ||
      issue.description?.toLowerCase().includes(query)
    );
  });

  if (loading) return <p style={{ textAlign: "center", marginTop: 40 }}>Loading...</p>;

  return (
    <div className="app-layout">
      <Navbar />
      <main>
        <div className="dashboard-container">
          <div className="dashboard-header">
            <div>
              <p className="eyebrow">AI-Powered QR Maintenance Hub</p>
              <h2>Admin Dashboard</h2>
              <p className="dashboard-subtitle">
                Monitor assets, review issue history, and keep maintenance workflows moving.
              </p>
            </div>
            <Link to="/admin/add-asset" className="add-asset-link">
              + Add Asset
            </Link>
          </div>

          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>{assets.length}</h3>
              <p>Total Assets</p>
            </div>
            <div className="stat-card">
              <h3>{pendingIssues}</h3>
              <p>Pending Issues</p>
            </div>
            <div className="stat-card">
              <h3>{resolvedIssues}</h3>
              <p>Resolved Issues</p>
            </div>
          </div>

          <div className="dashboard-grid">
            <section className="dashboard-section">
              <div className="section-header">
                <h3>Assets</h3>
                <Link to="/admin/add-asset" className="secondary-link">
                  Add New
                </Link>
              </div>

              <input
                type="text"
                className="dashboard-search"
                placeholder="Search assets by name, category, or code"
                value={assetSearch}
                onChange={(e) => setAssetSearch(e.target.value)}
              />

              {filteredAssets.length === 0 ? (
                <p className="empty-state">No matching assets found.</p>
              ) : (
                filteredAssets.map((asset) => <Isshucard key={asset.id} asset={asset} />)
              )}
            </section>

            <section className="dashboard-section">
              <div className="section-header">
                <h3>Recent Issues</h3>
              </div>

              <input
                type="text"
                className="dashboard-search"
                placeholder="Search issues by title, status, or category"
                value={issueSearch}
                onChange={(e) => setIssueSearch(e.target.value)}
              />

              {filteredIssues.length === 0 ? (
                <p className="empty-state">No matching issues found.</p>
              ) : (
                filteredIssues.map((issue) => (
                  <div key={issue.id} className={`issue-card priority-${issue.priority?.toLowerCase()}`}>
                    <div className="issue-top">
                      <h3>{issue.title}</h3>
                      <span className={`priority-tag priority-${issue.priority?.toLowerCase()}`}>
                        {issue.priority}
                      </span>
                    </div>

                    <p className="issue-desc">{issue.description}</p>
                    <p className="issue-meta">Category: {issue.category}</p>
                    {issue.maintenanceNote && (
                      <p className="issue-meta">Note: {issue.maintenanceNote}</p>
                    )}

                    <div className="issue-status-row">
                      <label>Status:</label>
                      <select
                        value={issue.status}
                        onChange={(e) => {
                          const newStatus = e.target.value;
                          if (newStatus === "Resolved" && !issue.maintenanceNote) {
                            const note = prompt("Maintenance note likho (resolve karne se pehle zaroori hai):");
                            if (!note) return;
                            handleStatusChange(issue.id, newStatus, issue.assetId, note);
                          } else {
                            handleStatusChange(issue.id, newStatus, issue.assetId);
                          }
                        }}
                      >
                        <option>Reported</option>
                        <option>Assigned</option>
                        <option>Inspection Started</option>
                        <option>Maintenance In Progress</option>
                        <option>Resolved</option>
                        <option>Closed</option>
                        <option>Reopened</option>
                      </select>
                    </div>

                    <div className="issue-status-row">
                      <label>Technician:</label>
                      <select
                        value={issue.assignedTo || "Unassigned"}
                        onChange={(e) => handleAssignChange(issue.id, e.target.value)}
                      >
                        {TECHNICIANS.map((tech) => (
                          <option key={tech} value={tech}>
                            {tech}
                          </option>
                        ))}
                      </select>
                    </div>

                    <Link to={`/asset/${issue.assetId}`} className="view-asset-link">
                      View Asset →
                    </Link>
                  </div>
                ))
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AdminDashboard;