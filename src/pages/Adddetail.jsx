import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebasecode/Firebase";
import { QRCodeCanvas } from "qrcode.react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

function AssetDetails() {
  const { id } = useParams();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAsset() {
      try {
        const docRef = doc(db, "assets", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAsset({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error("Error fetching asset:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAsset();
  }, [id]);

const qrUrl = `${window.location.origin}/asset/${id}`;
  const downloadQR = () => {
    const canvas = document.getElementById("asset-qr-code");
    const pngUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = `${asset?.name || "asset"}-QR.png`;
    link.click();
  };

  if (loading) return <p>Loading...</p>;
  if (!asset) return <p>Asset not found</p>;

  return (
    <div className="app-layout">
      <Navbar />
      <main>
        <div className="asset-details-container">
          <h2>{asset.name}</h2>
          <p><strong>Category:</strong> {asset.category}</p>
          <p><strong>Location:</strong> {asset.location}</p>
          <p><strong>Asset Code:</strong> {asset.assetCode}</p>

          <div className="qr-section">
            <QRCodeCanvas
              id="asset-qr-code"
              value={qrUrl}
              size={220}
              level="H"
            />
            {/* <p className="qr-link">{qrUrl}</p> */}
            <button onClick={downloadQR}>Download QR Code</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AssetDetails;