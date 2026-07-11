import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleSignup } from "../firebasecode/Firebase";
import Continuswithgoogle from "./Continuswithgoogle";

function Createuser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await handleSignup(formData.name, formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
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
        <button type="submit">Sign Up</button>
      </form>

      <Link to="/Signupwithexitingemail" className="login-link">
        Already have an account? Login
      </Link>

      {error && <p className="error-text">{error}</p>}

      <Continuswithgoogle />
    </div>
  );
}

export default Createuser;