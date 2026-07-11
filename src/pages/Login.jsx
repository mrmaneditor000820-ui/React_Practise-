import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
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
      toast.success("Login successful");
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
          toast.success("Account created successfully");
          navigate("/admin/dashboard");
        } catch (signupErr) {
          if (signupErr.code === "auth/weak-password") {
            const message = "Password kam se kam 6 characters ka hona chahiye";
            setError(message);
            toast.error(message);
          } else if (signupErr.code === "auth/email-already-in-use") {
            const message = "Ye email pehle se registered hai, sahi password dalo";
            setError(message);
            toast.error(message);
          } else {
            const message = signupErr.message;
            setError(message);
            toast.error(message);
          }
        }
      } else {
        const message = err.message;
        setError(message);
        toast.error(message);
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