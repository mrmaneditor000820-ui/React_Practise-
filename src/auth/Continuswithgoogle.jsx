import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleGoogleSignIn } from "../firebasecode/Firebase";

function Continuswithgoogle() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogle = async () => {
    setError("");
    try {
      await handleGoogleSignIn();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <button className="google-btn" onClick={handleGoogle}>
        Continue with Google
      </button>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}

export default Continuswithgoogle;