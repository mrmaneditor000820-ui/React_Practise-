import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { getAssetById, getIssuesByAsset } from "../firebasecode/Firebase";
import Navbar from "../components/navbar/Navbar";

function AssetDetails() {
  const { id } = useParams();
  const [asset, setAsset] = useState(null);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchAsset = async () => {
      const [assetData, issueData] = await Promise.all([getAssetById(id), getIssuesByAsset(id)]);
      setAsset(assetData);
      setIssues(issueData);
    };
    fetchAsset();
  }, [id]);

  if (!asset) return <p>Loading...</p>;

  const publicUrl = `${window.location.origin}/asset/${id}`;

  return (
    <>
      <Navbar />
      <div className="asset-details">
        <h2>{asset.name}</h2>
        <p><strong>Code:</strong> {asset.assetCode}</p>
        <p><strong>Category:</strong> {asset.category}</p>
        <p><strong>Location:</strong> {asset.location}</p>
        <p><strong>Status:</strong> {asset.status}</p>

        <div className="qr-box">
          <QRCodeCanvas value={publicUrl} size={180} />
          <p>Scan this QR to open the public asset page</p>
          <Link to={`/asset/${id}`} target="_blank" rel="noreferrer">
            Open Public Asset Page
          </Link>
        </div>

        <div className="recent-activity">
          <h3>Maintenance History</h3>
          {issues.length === 0 ? (
            <p>No history yet. Report the first issue to start the timeline.</p>
          ) : (
            issues.map((issue) => (
              <div key={issue.id} className="activity-item">
                <p>{issue.title}</p>
                <span className={`mini-status status-${issue.status?.replace(/\s+/g, "-").toLowerCase()}`}>
                  {issue.status}
                </span>
              </div>
            ))
          )}
        </div>

        <Link to={`/report-issue/${id}`} className="report-btn">
          Report an Issue
        </Link>
      </div>
    </>
  );
}

export default AssetDetails;