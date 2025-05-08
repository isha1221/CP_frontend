import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Check,
  AlertCircle,
  Zap,
  Award,
  FileText,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";
import axios from "axios";

const PlansPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const navigate = useNavigate();


  // Set initial selected plan based on localStorage
  useEffect(() => {
    const savedPlan = localStorage.getItem("selectedPlan");
    if (savedPlan) {
      setSelectedPlan(savedPlan);
    }
  }, []);

  const plans = [
    {
      type: "RP_BASIC",
      name: "Basic",
      price: "Free",
      icon: <FileText size={32} />,
      features: [
        "Upload up to 5 resumes",
        "Basic resume analysis",
        "Career path suggestions",
        "Resume optimization tips",
      ],
      recommended: false,
    },
    {
      type: "RP_MOD",
      name: "Moderate",
      price: "$9.99/month",
      icon: <Zap size={32} />,
      features: [
        "Upload up to 15 resumes",
        "Advanced resume analysis",
        "Detailed career path predictions",
        "Personalized optimization suggestions",
        "Priority support",
      ],
      recommended: true,
    },
    {
      type: "RP_PRO",
      name: "Professional",
      price: "$19.99/month",
      icon: <Award size={32} />,
      features: [
        "Unlimited resume uploads",
        "Premium resume analysis",
        "Comprehensive career predictions",
        "Expert optimization recommendations",
        "Priority support",
        "Career coaching resources",
      ],
      recommended: false,
    },
  ];

  const faqs = [
    {
      question: "Can I switch plans later?",
      answer:
        "Yes, you can upgrade your plan at any time from your account settings. However, you cannot downgrade to a lower plan once upgraded.",
    },
    {
      question: "What happens if I exceed my resume limit?",
      answer:
        "You'll need to upgrade to a higher tier plan or delete existing resumes to upload new ones.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 14-day money-back guarantee for all paid subscriptions.",
    },
    {
      question: "How secure is my resume data?",
      answer:
        "We use industry-standard encryption to protect your data, which is never shared with third parties.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // All plans are selectable now
  const isPlanSelectable = () => {
    return true;
  };

  const handleSelectPlan = async () => {
    if (!selectedPlan) return;

    // Reset messages
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.put(
        "http://localhost:3333/auth/update-plan",
        { plan_type: selectedPlan }, // Make sure this matches your PlanUpdateRequest structure
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with the user's auth token
          },
        }
      );
      // Handle response
      console.log(response.data);
      // Store selected plan in localStorage
      localStorage.setItem("selectedPlan", selectedPlan);

      setSuccessMessage(
        `Successfully selected ${getPlanName(selectedPlan)} plan!`
      );

      // Navigate after a short delay to show success message
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      console.error("Error selecting plan:", err);
      setError("Failed to select plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to get plan name from type
  const getPlanName = (planType) => {
    const plan = plans.find((p) => p.type === planType);
    return plan ? plan.name : planType;
  };

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Choose Your Career Plan</h1>
          <p>
            Select a plan tailored to your career goals and resume management
            needs.
          </p>
        </div>
      </section>

      {error && (
        <div
          className="error-message"
          style={{
            backgroundColor: "rgba(255, 0, 0, 0.1)",
            color: "#d32f2f",
            padding: "0.75rem 1rem",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            maxWidth: "600px",
            margin: "0 auto 1rem",
          }}
        >
          <AlertCircle size={20} className="error-icon" />
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div
          className="success-message"
          style={{
            backgroundColor: "rgba(0, 255, 0, 0.1)",
            color: "#388e3c",
            padding: "0.75rem 1rem",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            maxWidth: "600px",
            margin: "0 auto 1rem",
          }}
        >
          <Check size={20} className="success-icon" />
          <span>{successMessage}</span>
        </div>
      )}

      <section className="features">
        <h2>Available Plans</h2>
        <div className="feature-grid" style={{ display: "flex", gap: "1rem" }}>
          {plans.map((plan) => {
            const isSelectable = isPlanSelectable(plan.type);

            return (
              <div
                key={plan.type}
                className={`feature-card ${
                  selectedPlan === plan.type ? "selected" : ""
                }`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: "1",
                  minHeight: "400px",
                  borderColor:
                    selectedPlan === plan.type
                      ? "var(--teal-2)"
                      : "transparent",
                  boxShadow:
                    selectedPlan === plan.type
                      ? "0 0 0 2px var(--teal-2)"
                      : "0 2px 8px rgba(0,0,0,0.08)",
                  borderRadius: "8px",
                  padding: "1.5rem",
                  backgroundColor: "white",
                  transition: "all 0.3s ease",
                  opacity: isSelectable ? 1 : 0.6,
                  position: "relative",
                }}
                onClick={() => isSelectable && setSelectedPlan(plan.type)}
              >
                <div className="feature-icon">{plan.icon}</div>
                <h3>{plan.name}</h3>
                <p
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    marginBottom: "1rem",
                  }}
                >
                  {plan.price}
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    textAlign: "left",
                    marginBottom: "1rem",
                    flexGrow: 1,
                  }}
                >
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                        fontSize: "0.875rem",
                      }}
                    >
                      <Check
                        size={16}
                        style={{ color: "var(--teal-2)", flexShrink: 0 }}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`button ${
                    selectedPlan === plan.type ? "secondary" : "primary"
                  }`}
                  style={{ width: "100%", marginTop: "auto" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    isSelectable && setSelectedPlan(plan.type);
                  }}
                  disabled={loading || !isSelectable}
                >
                  {selectedPlan === plan.type ? "Selected" : "Select Plan"}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="upload-section">
        <button
          className="cta-button"
          onClick={handleSelectPlan}
          disabled={!selectedPlan || loading}
          style={{
            minWidth: "150px",
            justifyContent: "center",
            opacity: !selectedPlan || loading ? 0.6 : 1,
          }}
        >
          {loading ? "Processing..." : "Get Started"}
        </button>
      </section>

      <section className="faq-section" style={{ padding: "2rem 0" }}>
        <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>
          Frequently Asked Questions
        </h2>
        <div
          className="faq-container"
          style={{ maxWidth: "800px", margin: "0 auto" }}
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="faq-item"
              style={{
                borderRadius: "8px",
                backgroundColor: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                marginBottom: "1rem",
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
            >
              <div
                className="faq-question"
                onClick={() => toggleFaq(index)}
                style={{
                  padding: "1rem 1.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  fontWeight: "600",
                  backgroundColor:
                    openFaqIndex === index ? "rgba(0,0,0,0.02)" : "transparent",
                  borderBottom:
                    openFaqIndex === index
                      ? "1px solid rgba(0,0,0,0.08)"
                      : "none",
                }}
              >
                <span>{faq.question}</span>
                {openFaqIndex === index ? (
                  <ChevronUp size={20} style={{ color: "var(--teal-2)" }} />
                ) : (
                  <ChevronDown size={20} style={{ color: "var(--teal-2)" }} />
                )}
              </div>
              {openFaqIndex === index && (
                <div
                  className="faq-answer"
                  style={{
                    padding: "1rem 1.5rem",
                    color: "#666",
                    lineHeight: "1.6",
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PlansPage;
