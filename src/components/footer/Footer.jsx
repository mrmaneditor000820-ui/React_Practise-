function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h4>MaintainIQ</h4>
          <p>AI-Powered QR Maintenance Hub</p>
        </div>

        <div className="footer-links">
          <a href="/admin/dashboard">Dashboard</a>
          <a href="/admin/add-asset">Add Asset</a>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} MaintainIQ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;