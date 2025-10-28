import React, { useState } from "react";
import "./DockIcon.css";

const DockIcon = ({ icon, label, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className="dock-icon"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      type="button"
      aria-label={label}
    >
      <div className="dock-icon-container">
        <img
          src={icon}
          alt={label}
          className={`dock-icon-image ${hovered ? "hovered" : ""}`}
        />
        <span className="dock-tooltip">{label}</span>
      </div>
    </button>
  );
};

export default DockIcon;
