import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllIssues } from "../firebasecode/Firebase";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

function ResolvedIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadIssues = async () => {
      try {
        const allIssues = await getAllIssues();
        setIssues(allIssues.filter((issue) => issue.status === "Resolved" || issue.status === "Closed"));
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
              <h2>Resolved Issues</h2>
              <p className="dashboard-subtitle">Completed work with clear closure history for accountability.</p>
            </div>
            <Link to="/admin/dashboard" className="add-asset-link">
              Back to Dashboard
            </Link>
          </div>

          {loading ? (
            <p className="empty-state">Loading resolved work...</p>
          ) : issues.length === 0 ? (
            <p className="empty-state">No resolved issues yet.</p>
          ) : (
            <div className="workflow-list">
              {issues.map((issue) => (
                <div key={issue.id} className="issue-card priority-low">
                  <div className="issue-top">
                    <h3>{issue.title}</h3>
                    <span className="priority-tag priority-low">Resolved</span>
                  </div>

                  <p className="issue-desc">{issue.description}</p>
                  <p className="issue-meta">Category: {issue.category}</p>
                  <p className="issue-meta">Recommended Action: {issue.recommendedAction || "Inspection required"}</p>
                  <p className="issue-meta">Status: {issue.status}</p>

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

export default ResolvedIssues;
