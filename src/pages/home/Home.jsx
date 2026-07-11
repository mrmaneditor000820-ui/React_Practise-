import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

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

        <section className="stats-bar">
          <div className="stat-item">
            <h2>100%</h2>
            <p>Paperless Reporting</p>
          </div>
          <div className="stat-item">
            <h2>&lt; 30s</h2>
            <p>To Report an Issue</p>
          </div>
          <div className="stat-item">
            <h2>24/7</h2>
            <p>Asset Visibility</p>
          </div>
        </section>

        <section className="feature-grid">
          <article className="feature-card">
            <span className="feature-icon">🪪</span>
            <h3>Digital Asset Identity</h3>
            <p>Every asset gets a permanent record with location, category, status, and maintenance history.</p>
          </article>
          <article className="feature-card">
            <span className="feature-icon">🤖</span>
            <h3>AI-Assisted Issue Triage</h3>
            <p>Reports are classified by priority, recommended action, and likely causes so teams act faster.</p>
          </article>
          <article className="feature-card">
            <span className="feature-icon">✅</span>
            <h3>Accountable Service Workflow</h3>
            <p>Track assignments, progress, evidence, and follow-ups in one professional maintenance system.</p>
          </article>
        </section>

        <section className="how-it-works">
          <h2>How It Works</h2>
          <div className="steps-grid">
            <div className="step-item">
              <span className="step-number">1</span>
              <h4>Scan the QR</h4>
              <p>Anyone can scan an asset's QR code — no login required.</p>
            </div>
            <div className="step-item">
              <span className="step-number">2</span>
              <h4>Report the Issue</h4>
              <p>Describe the problem in plain language — AI handles the rest.</p>
            </div>
            <div className="step-item">
              <span className="step-number">3</span>
              <h4>AI Triages It</h4>
              <p>Category, priority, and possible causes are generated instantly.</p>
            </div>
            <div className="step-item">
              <span className="step-number">4</span>
              <h4>Team Resolves It</h4>
              <p>Admins assign, track, and close the loop with full accountability.</p>
            </div>
          </div>
        </section>

        <section className="cta-banner">
          <h2>Ready to bring order to your maintenance workflow?</h2>
          <p>Set up your first asset in under two minutes.</p>
          <Link to="/login" className="primary-cta">
            Get Started
          </Link>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Home;