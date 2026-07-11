import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin, signupAdmin } from "../firebasecode/Firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginAdmin(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      // Agar account exist nahi karta, naya bana ke login kar do
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        try {
          await signupAdmin(email, password);
          navigate("/admin/dashboard");
        } catch (signupErr) {
          if (signupErr.code === "auth/weak-password") {
            setError("Password kam se kam 6 characters ka hona chahiye");
          } else if (signupErr.code === "auth/email-already-in-use") {
            setError("Ye email pehle se registered hai, sahi password dalo");
          } else {
            setError(signupErr.message);
          }
        }
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} className="asset-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : "Login"}
        </button>
      </form>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default Login;