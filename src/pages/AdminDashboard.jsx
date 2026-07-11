import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllIssues, updateIssueStatus, handleLogout } from "../firebasecode/Firebase";
import Navbar from "../components/navbar/Navbar";

function AdminDashboard() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadIssues = async () => {
    try {
      const data = await getAllIssues();
      setIssues(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIssues();
  }, []);

  const handleStatusChange = async (issueId, newStatus, assetId) => {
    try {
      await updateIssueStatus(issueId, newStatus, assetId);
      loadIssues();
    } catch (err) {
      console.error(err.message);
    }
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: 40 }}>Loading...</p>;

  return (
    <>
    <Navbar />
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/admin/add-asset" className="add-asset-link">+ Add Asset</Link>
          <button onClick={async () => { await handleLogout(); window.location.href = "/login"; }}>
            Logout
          </button>
        </div>
      </div>

      {issues.length === 0 ? (
        <p>Koi issue report nahi hua abhi tak.</p>
      ) : (
        <div className="issues-list">
          {issues.map((issue) => (
            <div key={issue.id} className={`issue-card priority-${issue.priority?.toLowerCase()}`}>
              <div className="issue-top">
                <h3>{issue.title}</h3>
                <span className={`priority-tag priority-${issue.priority?.toLowerCase()}`}>
                  {issue.priority}
                </span>
              </div>

              <p className="issue-desc">{issue.description}</p>
              <p className="issue-meta">Category: {issue.category}</p>

              <div className="issue-status-row">
                <label>Status:</label>
                <select
                  value={issue.status}
                  onChange={(e) => handleStatusChange(issue.id, e.target.value, issue.assetId)}
                >
                  <option>Reported</option>
                  <option>Assigned</option>
                  <option>Inspection Started</option>
                  <option>Maintenance In Progress</option>
                  <option>Resolved</option>
                  <option>Closed</option>
                </select>
              </div>

              <Link to={`/asset/${issue.assetId}`} className="view-asset-link">
                View Asset →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}

export default AdminDashboard;