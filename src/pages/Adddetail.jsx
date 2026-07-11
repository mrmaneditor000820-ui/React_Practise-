import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { getAssetById } from "../firebasecode/Firebase";

function AssetDetails() {
  const { id } = useParams();
  const [asset, setAsset] = useState(null);

  useEffect(() => {
    const fetchAsset = async () => {
      const data = await getAssetById(id);
      setAsset(data);
    };
    fetchAsset();
  }, [id]);

  if (!asset) return <p>Loading...</p>;

  const publicUrl = `${window.location.origin}/asset/${id}`;

  return (
    <div className="asset-details">
      <h2>{asset.name}</h2>
      <p><strong>Code:</strong> {asset.assetCode}</p>
      <p><strong>Category:</strong> {asset.category}</p>
      <p><strong>Location:</strong> {asset.location}</p>
      <p><strong>Status:</strong> {asset.status}</p>

      <div className="qr-box">
        <QRCodeCanvas value={publicUrl} size={180} />
        <p>Scan this QR to open public page</p>
        <Link to={`/asset/${id}`} target="_blank">
          Open Public Asset Page
        </Link>
      </div>
    </div>
  );
}

export default AssetDetails;