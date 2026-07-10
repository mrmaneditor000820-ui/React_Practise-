import { useState, useEffect } from "react";
import { auth, onAuthStateChanged, handleLogout } from "./Firebase";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await handleLogout();
    } catch (err) {
      console.error(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!user) return <p>Aap login nahi hain.</p>;

  return (
    <div className="profile-container">
      <h2>Welcome, {user.displayName || "User"}</h2>
      {user.photoURL ? (
        <img
          className="profile-img"
          src={user.photoURL}
          alt="profile"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="profile-placeholder">
          {user.displayName?.charAt(0) || "U"}
        </div>
      )}
      <p><strong>Name:</strong> {user.displayName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button className="signout-btn" onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default Profile;