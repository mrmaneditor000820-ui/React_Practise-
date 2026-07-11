import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAssetById, getIssuesByAsset } from "../firebasecode/Firebase";

function PublicAsset() {
  const { id } = useParams();
  const [asset, setAsset] = useState(null);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching asset with id:", id); // ← debug
        const data = await getAssetById(id);
        console.log("Asset data received:", data); // ← debug

        if (!data) {
          setNotFound(true);
        } else {
          setAsset(data);
          const issueData = await getIssuesByAsset(id);
          setIssues(issueData);
        }
      } catch (err) {
        console.error("Fetch error:", err); // ← asal error yahan dikhega
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
      <div className="public-asset-container">
        <h2>Asset not found</h2>
        <p>Ye QR code ya link valid nahi hai.</p>
      </div>
    );
  }

  return (
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
            <h3>Recent Activity</h3>
            {issues.slice(0, 3).map((issue) => (
              <div key={issue.id} className="activity-item">
                <p>{issue.title}</p>
                <span className={`mini-status status-${issue.status?.replace(/\s+/g, "-").toLowerCase()}`}>
                  {issue.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PublicAsset;