import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, onAuthStateChanged, handleLogout } from "../../firebasecode/Firebase";
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const [cartCount] = useState(3);
  const [wishlistCount] = useState(5);

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
    <nav className="ecom-navbar">
      <div className="ecom-top">
        <div className="ecom-logo">Shop<span>Ease</span></div>

        <div className="ecom-search">
          <input type="text" placeholder="Search for products, brands and more" />
          <button>
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                fill="currentColor"
                d="M20.87 20.17l-5.59-5.59C16.35 13.35 17 11.75 17 10c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7c1.75 0 3.35-.65 4.58-1.71l5.59 5.59.7-.71zM10 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"
              />
            </svg>
          </button>
        </div>

        <div className="ecom-icons">
          {user ? (
            <div className="ecom-account-menu">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="profile"
                  referrerPolicy="no-referrer"
                  className="ecom-profile-img"
                />
              ) : (
                <div className="ecom-profile-placeholder">
                  {user.displayName?.charAt(0) || "U"}
                </div>
              )}
              <div className="ecom-account-dropdown">
                <p className="ecom-account-name">
                  {user.displayName || user.email}
                </p>
                <button className="ecom-signout-btn" onClick={handleSignOut}>
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link to="/Createuser" className="ecom-icon-item">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path
                  fill="currentColor"
                  d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z"
                />
              </svg>
              <span>Sign in</span>
            </Link>
          )}

          <div className="ecom-icon-item">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path
                fill="currentColor"
                d="M12.1 18.55l-.1.1-.11-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
              />
            </svg>
            <span>Wishlist</span>
            {wishlistCount > 0 && <span className="ecom-badge">{wishlistCount}</span>}
          </div>

          <div className="ecom-icon-item">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path
                fill="currentColor"
                d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L20.88 5H4.54l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
              />
            </svg>
            <span>Cart</span>
            {cartCount > 0 && <span className="ecom-badge">{cartCount}</span>}
          </div>
        </div>
      </div>

      <div className="ecom-categories">
        <a href="#">Electronics</a>
        <a href="#">Fashion</a>
        <a href="#">Home & Kitchen</a>
        <a href="#">Beauty</a>
        <a href="#">Grocery</a>
        <a href="#">Sports</a>
        <a href="#">Books</a>
      </div>
    </nav>
  );
}

export default Navbar;