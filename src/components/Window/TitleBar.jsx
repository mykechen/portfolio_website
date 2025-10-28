import React from "react";
import "./TitleBar.css";

const TitleBar = ({ title, onClose, onMinimize, onMaximize, maximized }) => {
  return (
    <div className="title-bar">
      <div className="traffic-lights">
        <button
          className="traffic-light traffic-light-close"
          onClick={onClose}
          aria-label="Close"
        />
        <button
          className="traffic-light traffic-light-minimize"
          onClick={onMinimize}
          aria-label="Minimize"
        />
        <button
          className="traffic-light traffic-light-maximize"
          onClick={onMaximize}
          aria-label="Maximize"
        />
      </div>
      <div className="title-bar-title">{title}</div>
    </div>
  );
};

export default TitleBar;
