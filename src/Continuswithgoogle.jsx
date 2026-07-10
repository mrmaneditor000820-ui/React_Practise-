import { useState } from "react";
import { handleGoogleSignIn } from "./firebasecode/Firebase";

function GoogleSignIn() {
  const [error, setError] = useState("");

  const handleGoogle = async () => {
    setError("");
    try {
      const user = await handleGoogleSignIn();
      console.log("Logged in as:", user.displayName);
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