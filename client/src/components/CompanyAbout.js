import React from "react";
import "./CompanyAbout.css"; // Ensure you create this CSS file for styling

const CompanyAbout = ({ title, content, onClose }) => {
  return (
    <div className="company-about-overlay">
      <div className="company-about-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default CompanyAbout;
