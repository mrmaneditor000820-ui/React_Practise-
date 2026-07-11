import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <div className="home-page">
        <section className="hero-card">
          <p className="eyebrow">AI-Powered QR Maintenance & Asset History Platform</p>
          <h1>Track every asset, issue, and repair story from one smart dashboard.</h1>
          <p>
            Scan a QR code, report a problem in seconds, and let AI help classify the issue
            before it reaches the maintenance team.
          </p>
          <div className="hero-actions">
            <Link to="/login" className="primary-cta">
              Admin Login
            </Link>
            <Link to="/admin/dashboard" className="secondary-cta">
              Open Dashboard
            </Link>
          </div>
        </section>

        <section className="feature-grid">
          <article className="feature-card">
            <h3>QR-Based Asset Access</h3>
            <p>Every asset gets a unique QR link for instant public status and issue reporting.</p>
          </article>
          <article className="feature-card">
            <h3>Smart AI Triage</h3>
            <p>Reports are categorized by intent and priority so teams can act faster.</p>
          </article>
          <article className="feature-card">
            <h3>Complete History</h3>
            <p>Track every maintenance update and issue timeline in one place.</p>
          </article>
        </section>
      </div>
    </>
  );
}

export default Home;
