import { Link } from "react-router-dom";

function Isshucard({ asset }) {
  return (
    <div className="asset-card">
      <div className="asset-card-top">
        <div>
          <h3>{asset.name}</h3>
          <p className="asset-code">Code: {asset.assetCode || asset.id}</p>
        </div>
        <span
          className={`status-badge status-${(asset.status || "Operational").toLowerCase().replace(/\s+/g, "-")}`}
        >
          {asset.status || "Operational"}
        </span>
      </div>

      <p className="asset-category">Category: {asset.category}</p>
      {asset.location && <p className="asset-location">Location: {asset.location}</p>}

      <div className="asset-card-actions">
        <Link to={`/admin/asset/${asset.id}`} className="view-asset-link">
          View Details →
        </Link>
        <Link to={`/asset/${asset.id}`} className="secondary-link" target="_blank" rel="noreferrer">
          Public QR Page
        </Link>
      </div>
    </div>
  );
}

export default Isshucard;