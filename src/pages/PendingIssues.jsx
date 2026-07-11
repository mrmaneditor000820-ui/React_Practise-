import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllIssues } from "../firebasecode/Firebase";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

function PendingIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadIssues = async () => {
      try {
        const allIssues = await getAllIssues();
        setIssues(allIssues.filter((issue) => issue.status !== "Resolved" && issue.status !== "Closed"));
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadIssues();
  }, []);

  return (
    <div className="app-layout">
      <Navbar />
      <main>
        <div className="workflow-page">
          <div className="workflow-header">
            <div>
              <p className="eyebrow">Maintenance Workflow</p>
              <h2>Pending Issues</h2>
              <p className="dashboard-subtitle">Open work that still needs triage, assignment, or follow-up.</p>
            </div>
            <Link to="/admin/dashboard" className="add-asset-link">
              Back to Dashboard
            </Link>
          </div>

          {loading ? (
            <p className="empty-state">Loading pending work...</p>
          ) : issues.length === 0 ? (
            <p className="empty-state">No pending issues at the moment.</p>
          ) : (
            <div className="workflow-list">
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
                  <p className="issue-meta">Recommended Action: {issue.recommendedAction || "Inspection required"}</p>
                  <p className="issue-meta">Assigned To: {issue.assignedTo || "Unassigned"}</p>

                  <Link to={`/asset/${issue.assetId}`} className="view-asset-link">
                    View Asset →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PendingIssues;
