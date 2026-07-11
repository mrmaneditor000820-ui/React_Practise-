import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, onAuthStateChanged, handleLogout } from "../../firebasecode/Firebase";
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await handleLogout();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="hamburger-btn">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
          </svg>
        </button>

        <div className="logo-text">
          <svg viewBox="0 0 90 20" width="90" height="20">
            <path
              fill="#FF0000"
              d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 0 14.285 0 14.285 0C14.285 0 5.35042 0 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C0 5.35043 0 10 0 10C0 10 0 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35043 27.9727 3.12324Z"
            />
            <path fill="#FFFFFF" d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" />
          </svg>
          <span className="logo-name">YouTube</span>
          <span className="logo-region">PK</span>
        </div>
      </div>

      <div className="navbar-center">
        <div className="search-container">
          <input type="text" placeholder="Search" className="search-input" />
          <button className="search-btn">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path
                fill="currentColor"
                d="M20.87 20.17l-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"
              />
            </svg>
          </button>
        </div>
        <button className="mic-btn">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="currentColor"
              d="M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V22h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"
            />
          </svg>
        </button>
      </div>

      <div className="navbar-right">
        <button className="icon-btn">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <circle cx="5" cy="12" r="2" fill="currentColor" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <circle cx="19" cy="12" r="2" fill="currentColor" />
          </svg>
        </button>

        {user ? (
          <div className="user-section">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="profile"
                referrerPolicy="no-referrer"
                className="navbar-profile-img"
              />
            ) : (
              <div className="navbar-profile-placeholder">
                {user.displayName?.charAt(0) || "U"}
              </div>
            )}
            <span className="navbar-user-name">{user.displayName || user.email}</span>
            <button className="signout-btn" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        ) : (
          <Link to="/Createuser" className="signin-btn">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                fill="currentColor"
                d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z"
              />
            </svg>
            <span>Sign in</span>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;