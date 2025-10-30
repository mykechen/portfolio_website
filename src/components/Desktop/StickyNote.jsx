import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import "./StickyNote.css";

const StickyNote = () => {
  const [position, setPosition] = useState({ x: 30, y: 30 });
  const [isDragging, setIsDragging] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isFloating, setIsFloating] = useState(false);
  const nodeRef = useRef(null);
  const lastPosition = useRef({ x: 30, y: 30 });
  const lastTime = useRef(Date.now());
  const animationFrameRef = useRef(null);

  const handleDragStart = () => {
    setIsDragging(true);
    setIsFloating(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    lastPosition.current = position;
    lastTime.current = Date.now();
  };

  const handleDrag = (e, data) => {
    const now = Date.now();
    const deltaTime = (now - lastTime.current) / 1000; // Convert to seconds

    if (deltaTime > 0) {
      const deltaX = data.x - lastPosition.current.x;
      const deltaY = data.y - lastPosition.current.y;

      // Calculate velocity
      const vx = deltaX / deltaTime;
      const vy = deltaY / deltaTime;

      setVelocity({ x: vx, y: vy });
      lastPosition.current = { x: data.x, y: data.y };
      lastTime.current = now;
    }
  };

  const handleDragStop = (e, data) => {
    setPosition({ x: data.x, y: data.y });
    setIsDragging(false);

    // Start floating animation with current velocity
    if (Math.abs(velocity.x) > 50 || Math.abs(velocity.y) > 50) {
      setIsFloating(true);
      startFloating(data.x, data.y, velocity.x, velocity.y);
    }
  };

  const startFloating = (startX, startY, vx, vy) => {
    let currentX = startX;
    let currentY = startY;
    let velocityX = vx * 0.3; // Scale down initial velocity
    let velocityY = vy * 0.3;

    const friction = 0.95; // Deceleration factor
    const bounceDamping = 0.6; // Energy loss on bounce
    const minVelocity = 10; // Stop when velocity is very low

    const stickyNoteWidth = 320;
    const stickyNoteHeight = 400;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const menuBarHeight = 28;

    const animate = () => {
      // Apply friction
      velocityX *= friction;
      velocityY *= friction;

      // Update position
      currentX += velocityX * 0.016; // Approximate frame time
      currentY += velocityY * 0.016;

      // Check boundaries and bounce
      if (currentX <= 0) {
        currentX = 0;
        velocityX = Math.abs(velocityX) * bounceDamping;
      } else if (currentX >= screenWidth - stickyNoteWidth) {
        currentX = screenWidth - stickyNoteWidth;
        velocityX = -Math.abs(velocityX) * bounceDamping;
      }

      if (currentY <= 0) {
        currentY = 0;
        velocityY = Math.abs(velocityY) * bounceDamping;
      } else if (currentY >= screenHeight - stickyNoteHeight - menuBarHeight) {
        currentY = screenHeight - stickyNoteHeight - menuBarHeight;
        velocityY = -Math.abs(velocityY) * bounceDamping;
      }

      setPosition({ x: currentX, y: currentY });

      // Continue animation if velocity is significant
      if (Math.abs(velocityX) > minVelocity || Math.abs(velocityY) > minVelocity) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsFloating(false);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <Draggable
      nodeRef={nodeRef}
      position={position}
      onStart={handleDragStart}
      onDrag={handleDrag}
      onStop={handleDragStop}
      cancel=""
    >
      <div
        ref={nodeRef}
        className={`sticky-note ${isDragging ? "dragging" : ""} ${isFloating ? "floating" : ""}`}
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
              <li>Stay hydrated</li>
              <li>Go touch grass</li>
              <li>Get good at golf</li>
              <li className="completed">Go skydiving</li>
              <li>Launch my startup</li>
              <li className="completed">Move to the US</li>
              <li>Get a job...</li>
              <li>Sleep.</li>
            </ul>
          </div>
          <div className="sticky-note-section">
            <h3 className="sticky-note-title">Tips:</h3>
            <ul className="sticky-note-list">
              <li>Double click folder to check my work out</li>
              <li>Use apps in the dock to learn more about me</li>
              <li>Feel free to connect! 🚀</li>
            </ul>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default StickyNote;
