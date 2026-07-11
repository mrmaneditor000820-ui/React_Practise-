import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addIssue, getAssetById } from "../firebasecode/Firebase";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

function ReportIssue() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState("");
  const [aiResult, setAiResult] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ---- AI Triage function (smart keyword-based, no external API) ----
  const runAITriage = async () => {
    if (!complaint.trim()) {
      setError("Pehle complaint likho");
      return;
    }
    setError("");
    setLoadingAI(true);

    // Thoda delay taake "AI analyzing..." real jaisa lage
    await new Promise((resolve) => setTimeout(resolve, 1200));

    try {
      const asset = await getAssetById(id);
      const text = complaint.toLowerCase();

      let category = "General";
      let priority = "Medium";
      let possibleCauses = [];
      let initialChecks = [];

      if (text.includes("leak") || text.includes("pani") || text.includes("water")) {
        category = "Leakage";
        priority = "High";
        possibleCauses = ["Blocked drain pipe", "Damaged seal", "Condensation buildup"];
        initialChecks = ["Turn off power near water", "Inspect drainage line", "Check for visible cracks"];
      } else if (text.includes("noise") || text.includes("awaz") || text.includes("sound")) {
        category = "Mechanical";
        priority = "Medium";
        possibleCauses = ["Loose internal parts", "Worn out bearing", "Fan obstruction"];
        initialChecks = ["Listen for source of noise", "Check for loose panels", "Inspect moving parts"];
      } else if (text.includes("kharab") || text.includes("not working") || text.includes("nahi chal")) {
        category = "Functional Failure";
        priority = "High";
        possibleCauses = ["Power supply issue", "Internal component failure", "Wiring fault"];
        initialChecks = ["Check power connection", "Inspect for visible damage", "Test with reset"];
      } else if (text.includes("slow") || text.includes("weak") || text.includes("performance")) {
        category = "Performance";
        priority = "Medium";
        possibleCauses = ["Dust accumulation", "Aging components", "Overuse"];
        initialChecks = ["Check ventilation", "Inspect filters", "Test under load"];
      } else if (text.includes("hot") || text.includes("garam") || text.includes("smoke") || text.includes("burn")) {
        category = "Safety Hazard";
        priority = "High";
        possibleCauses = ["Overheating component", "Electrical short", "Faulty wiring"];
        initialChecks = ["Disconnect power immediately", "Do not touch device", "Ensure area is ventilated"];
      } else {
        category = asset?.category || "General";
        priority = "Medium";
        possibleCauses = ["Requires physical inspection to determine cause"];
        initialChecks = ["Inspect asset for visible issues", "Test basic functionality"];
      }

      const title = `${asset?.name || "Asset"} - ${category} Issue Reported`;

      setAiResult({ title, category, priority, possibleCauses, initialChecks });
    } catch (err) {
      console.error("Triage error:", err);
      setAiResult({
        title: complaint.slice(0, 50),
        category: "General",
        priority: "Medium",
        possibleCauses: ["Manual review needed"],
        initialChecks: ["Inspect asset physically"],
      });
    } finally {
      setLoadingAI(false);
    }
  };

  const handleFieldChange = (field, value) => {
    setAiResult({ ...aiResult, [field]: value });
  };

  const handleSubmit = async () => {
    if (!aiResult) return;
    setSubmitting(true);
    try {
      await addIssue({
        assetId: id,
        title: aiResult.title,
        description: complaint,
        category: aiResult.category,
        priority: aiResult.priority,
        possibleCauses: aiResult.possibleCauses,
        initialChecks: aiResult.initialChecks,
      });
      navigate(`/asset/${id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-layout">
      <Navbar />
      <main>
        <div className="report-container">
          <h2>Report an Issue</h2>

          <textarea
            placeholder="Describe the problem... (e.g. AC se pani leak ho raha hai)"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            rows={4}
          />

          <button onClick={runAITriage} disabled={loadingAI}>
            {loadingAI ? "AI analyzing..." : "Analyze with AI"}
          </button>

          {error && <p className="error-text">{error}</p>}

          {aiResult && (
            <div className="ai-result-box">
              <h3>AI Suggestion (edit if needed)</h3>

              <label>Title</label>
              <input
                value={aiResult.title}
                onChange={(e) => handleFieldChange("title", e.target.value)}
              />

              <label>Category</label>
              <input
                value={aiResult.category}
                onChange={(e) => handleFieldChange("category", e.target.value)}
              />

              <label>Priority</label>
              <select
                value={aiResult.priority}
                onChange={(e) => handleFieldChange("priority", e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <div className="ai-list">
                <strong>Possible Causes:</strong>
                <ul>
                  {aiResult.possibleCauses?.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>

              <div className="ai-list">
                <strong>Initial Checks:</strong>
                <ul>
                  {aiResult.initialChecks?.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>

              <button onClick={handleSubmit} disabled={submitting} className="submit-btn">
                {submitting ? "Submitting..." : "Submit Issue"}
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ReportIssue;