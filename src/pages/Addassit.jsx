import { useState } from "react";
import { addAsset } from "../firebasecode/Firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

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
      setError("Sab fields bharo");
      return;
    }

    try {
      const assetCode = generateAssetCode();
      const id = await addAsset({ ...formData, assetCode });
      navigate(`/admin/asset/${id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
   <>
   <Navbar />
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
    </>
  );
}

export default AddAsset;