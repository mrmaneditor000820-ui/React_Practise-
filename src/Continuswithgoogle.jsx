import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleGoogleSignIn } from "./firebasecode/Firebase";

function GoogleSignIn() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogle = async () => {
    try {
      await handleGoogleSignIn();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <button className="google-btn" onClick={handleGoogle}>
        Continue with Google
      </button>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default GoogleSignIn;