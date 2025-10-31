import React from "react";
import "./TitleBar.css";

const TitleBar = ({
  title,
  onClose,
  onMinimize,
  onMaximize,
  maximized,
  navigationControls,
}) => {
  const handleTrafficLightClick = (e, action) => {
    e.stopPropagation();
    action();
  };

  return (
    <div className="title-bar">
      <div className="traffic-lights">
        <button
          className="traffic-light traffic-light-close"
          onClick={(e) => handleTrafficLightClick(e, onClose)}
          aria-label="Close"
        />
        <button
          className="traffic-light traffic-light-minimize"
          onClick={(e) => handleTrafficLightClick(e, onMinimize)}
          aria-label="Minimize"
        />
        <button
          className="traffic-light traffic-light-maximize"
          onClick={(e) => handleTrafficLightClick(e, onMaximize)}
          aria-label="Maximize"
        />
      </div>
      {navigationControls ? (
        <div className="title-bar-with-nav">
          {navigationControls}
          <div className="title-bar-title">{title}</div>
        </div>
      ) : (
        <div className="title-bar-title">{title}</div>
      )}
    </div>
  );
};

export default TitleBar;
