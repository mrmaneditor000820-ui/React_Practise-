import { Link } from "react-router-dom";

function Assitscard({ asset }) {
  return (
    <div className="asset-card">
      <div className="asset-card-top">
        <h3>{asset.name}</h3>
        <span className={`status-badge status-${asset.status?.toLowerCase().replace(/\s+/g, "-")}`}>
          {asset.status}
        </span>
      </div>

      <p className="asset-code">Code: {asset.code || asset.id}</p>
      <p className="asset-category">Category: {asset.category}</p>
      {asset.location && <p className="asset-location">Location: {asset.location}</p>}

      <Link to={`/admin/asset/${asset.id}`} className="view-asset-link">
        View Details →
      </Link>
    </div>
  );
}

export default Assitscard;