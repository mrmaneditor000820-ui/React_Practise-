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
    <div>
      <h2>Welcome, {user.displayName || "User"}</h2>
      {user.photoURL && (
        <img 
          src={user.photoURL} 
          alt="profile" 
          style={{ width: 80, height: 80, borderRadius: "50%" }} 
        />
      )}
      <p><strong>Name:</strong> {user.displayName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default Profile;