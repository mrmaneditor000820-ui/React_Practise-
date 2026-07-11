import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <div className="home-page">
        <section className="hero-card">
          <p className="eyebrow">Professional Maintenance Management Platform</p>
          <h1>Give every physical asset a digital identity, service history, and accountable maintenance workflow.</h1>
          <p>
            QR codes are only the entry point. MaintainIQ helps teams triage issues, assign work,
            track progress, preserve evidence, and build a complete maintenance history for schools,
            hospitals, offices, factories, and facilities.
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
            <h3>Digital Asset Identity</h3>
            <p>Every asset gets a permanent record with location, category, status, and maintenance history.</p>
          </article>
          <article className="feature-card">
            <h3>AI-Assisted Issue Triage</h3>
            <p>Reports are classified by priority, recommended action, and likely causes so teams act faster.</p>
          </article>
          <article className="feature-card">
            <h3>Accountable Service Workflow</h3>
            <p>Track assignments, progress, evidence, and follow-ups in one professional maintenance system.</p>
          </article>
        </section>
      </div>
    </>
  );
}

export default Home;
