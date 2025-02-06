import React from "react";


const CompanyAbout = ({ title, content, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("company-about-overlay")) {
      onClose();
    }
  };

  return (
    <div className="company-about-overlay" onClick={handleOverlayClick}>
      <div className="company-about-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default CompanyAbout;
