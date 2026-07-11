import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, onAuthStateChanged, handleLogout } from "../../firebasecode/Firebase";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const onLogout = async () => {
    await handleLogout();
    navigate("/login");
  };

  return (
    <nav className="app-navbar">
      <Link to="/" className="nav-logo">
        MaintainIQ
      </Link>

      {user ? (
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/add-asset">+ Add Asset</Link>
          <button onClick={onLogout}>Logout</button>
        </div>
      ) : (
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;