import { useState } from "react";
import { handleSignup } from "./Firebase";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await handleSignup(formData.name, formData.email, formData.password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <div className="auth-form">
        <input 
          type="text" 
          name="name"
          placeholder="Full Name" 
          value={formData.name} 
          onChange={handleChange} 
        />
        <input 
          type="email" 
          name="email"
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
        />
        <input 
          type="password" 
          name="password"
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange} 
        />
        <button onClick={handleSubmit}>Sign Up</button>
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default App;