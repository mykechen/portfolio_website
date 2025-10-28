import React, { useState, useRef } from "react";
import "./DesktopIcon.css";

const DesktopIcon = ({ icon, label, onDoubleClick }) => {
  const [selected, setSelected] = useState(false);
  const clickTimeoutRef = useRef(null);

  const handleClick = () => {
    clickTimeoutRef.current = setTimeout(() => {
      setSelected(true);
    }, 300);
  };

  const handleDoubleClick = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    setSelected(false);
    onDoubleClick();
  };

  return (
    <button
      className={`desktop-icon ${selected ? "selected" : ""}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      type="button"
      aria-label={label}
    >
      <div className="desktop-icon-image">{icon}</div>
      <div className="desktop-icon-label">{label}</div>
    </button>
  );
};

export default DesktopIcon;
