import { useState } from "react";
import { handleLogin } from "./Firebase";

function Login() {
  const [formData, setFormData] = useState({
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
      const user = await handleLogin(formData.email, formData.password);
      console.log("Logged in user:", user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
      <button onClick={handleSubmit}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default Login;