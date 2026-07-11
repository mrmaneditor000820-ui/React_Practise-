import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAssetById, getIssuesByAsset } from "../firebasecode/Firebase";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

function PublicAsset() {
  const { id } = useParams();
  const [asset, setAsset] = useState(null);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAssetById(id);

        if (!data) {
          setNotFound(true);
        } else {
          setAsset(data);
          const issueData = await getIssuesByAsset(id);
          setIssues(issueData);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <p style={{ textAlign: "center", marginTop: 40 }}>Loading...</p>;

  if (notFound) {
    return (
      <div className="app-layout">
        <Navbar />
        <main>
          <div className="public-asset-container">
            <div className="public-asset-card">
              <h2>Asset not found</h2>
              <p>This QR code or link does not match a registered asset.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Navbar />
      <main>
        <div className="public-asset-container">
          <div className="public-asset-card">
            <h2>{asset.name}</h2>
            <p className="asset-code">{asset.assetCode}</p>

            <div className={`status-badge status-${asset.status?.replace(/\s+/g, "-").toLowerCase()}`}>
              {asset.status}
            </div>

            <div className="asset-info">
              <p><strong>Category:</strong> {asset.category}</p>
              <p><strong>Location:</strong> {asset.location}</p>
            </div>

            <Link to={`/report-issue/${id}`} className="report-btn">
              Report an Issue
            </Link>

            {issues.length > 0 && (
              <div className="recent-activity">
                <h3>Service History</h3>
                {issues.slice(0, 4).map((issue) => (
                  <div key={issue.id} className="activity-item">
                    <div>
                      <p>{issue.title}</p>
                      <small>{issue.category} • {issue.priority}</small>
                    </div>
                    <span className={`mini-status status-${issue.status?.replace(/\s+/g, "-").toLowerCase()}`}>
                      {issue.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default PublicAsset;