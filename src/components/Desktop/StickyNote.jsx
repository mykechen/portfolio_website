import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import "./StickyNote.css";

const StickyNote = () => {
  const [position, setPosition] = useState({ x: 20, y: 60 });
  const [isDragging, setIsDragging] = useState(false);
  const nodeRef = useRef(null);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragStop = (e, data) => {
    setPosition({ x: data.x, y: data.y });
    setIsDragging(false);
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      onStart={handleDragStart}
      onStop={handleDragStop}
      cancel=""
    >
      <div
        ref={nodeRef}
        className={`sticky-note ${isDragging ? "dragging" : ""}`}
      >
        <div className="sticky-note-header">
          <div className="sticky-note-header-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
        <div className="sticky-note-content">
          <div className="sticky-note-section">
            <h3 className="sticky-note-title">To Do:</h3>
            <ul className="sticky-note-list">
              <li>Drink water</li>
              <li>Land my dream PM job</li>
              <li>Move to the US</li>
              <li>Get good at golf</li>
              <li>Visit a new place each year</li>
              <li>Go touch grass</li>
              <li>Graduate alive</li>
            </ul>
          </div>
          <div className="sticky-note-section">
            <h3 className="sticky-note-title">Tips:</h3>
            <ul className="sticky-note-list">
              <li>Double-click folders to explore my work</li>
              <li>Use apps in the dock to learn more about me</li>
            </ul>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default StickyNote;
