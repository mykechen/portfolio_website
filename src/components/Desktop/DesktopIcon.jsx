import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import "./DesktopIcon.css";

const DesktopIcon = ({ icon, label, initialPosition, onDoubleClick }) => {
  const [position, setPosition] = useState(initialPosition || { x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const clickTimeoutRef = useRef(null);
  const nodeRef = useRef(null);

  const handleClick = () => {
    clickTimeoutRef.current = setTimeout(() => {
      // Just handle click, no selection
    }, 300);
  };

  const handleDoubleClick = () => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    onDoubleClick();
  };

  const handleDragStart = () => {
    setIsDragging(true);
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
  };

  const handleDragStop = (e, data) => {
    setIsDragging(false);
    setPosition({ x: data.x, y: data.y });
  };

  const isImagePath = icon.startsWith("/");

  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      onStart={handleDragStart}
      onStop={handleDragStop}
    >
      <button
        ref={nodeRef}
        className={`desktop-icon ${isDragging ? "dragging" : ""}`}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        type="button"
        aria-label={label}
      >
        <div className="desktop-icon-image">
          {isImagePath ? (
            <img src={icon} alt={label} width="48" height="48" />
          ) : (
            icon
          )}
        </div>
        <div className="desktop-icon-label">{label}</div>
      </button>
    </Draggable>
  );
};

export default DesktopIcon;
