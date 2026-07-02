import React from "react";
import { useNavigate } from "react-router-dom";

function BackButton({ className = "", label = "Back", style = {} }) {
  const navigate = useNavigate();

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Fallback to home if no history
      navigate("/");
    }
  };

  return (
    <button
      type="button"
      className={`back-button ${className}`}
      onClick={handleBack}
      style={style}
      aria-label="Go back"
    >
      <i className="fas fa-arrow-left" aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}

export default BackButton;
