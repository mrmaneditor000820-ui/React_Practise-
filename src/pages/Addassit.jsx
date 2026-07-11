import { useState } from "react";
import { addAsset } from "../firebasecode/Firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

function AddAsset() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateAssetCode = () => {
    return "AST-" + Date.now().toString().slice(-6);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.category || !formData.location) {
      const message = "Sab fields bharo";
      setError(message);
      toast.error(message);
      return;
    }

    try {
      const assetCode = generateAssetCode();
      const id = await addAsset({ ...formData, assetCode });
      toast.success("Asset registered successfully");
      navigate(`/admin/asset/${id}`);
    } catch (err) {
      const message = err.message;
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="app-layout">
      <Navbar />
      <main>
        <div className="form-container">
          <h2>Register New Asset</h2>
          <form onSubmit={handleSubmit} className="asset-form">
            <input
              type="text"
              name="name"
              placeholder="Asset Name (e.g. Classroom Projector 01)"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="category"
              placeholder="Category (e.g. Projector, AC, Printer)"
              value={formData.category}
              onChange={handleChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Location (e.g. Room 204, 2nd Floor)"
              value={formData.location}
              onChange={handleChange}
            />
            <button type="submit">Register Asset</button>
          </form>
          {error && <p className="error-text">{error}</p>}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AddAsset;