import React, { useState, useEffect } from "react";
import { Apple, Wifi, Battery, Clock, Search, Radio } from "lucide-react";
import "./MenuBar.css";

const MenuBar = () => {
  const [time, setTime] = useState(new Date());
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="menu-bar">
      <div className="menu-bar-left">
        <button
          className="menu-item apple-logo"
          onClick={() => setShowDropdown(!showDropdown)}
          aria-label="Apple menu"
        >
          <Apple size={16} />
        </button>
        <div className="menu-item">
          <span className="menu-text">Myke Angelo Chen's Portfolio</span>
        </div>
        <div className="menu-item">
          <span className="menu-text">Contact</span>
        </div>
      </div>

      <div className="menu-bar-right">
        <Wifi size={16} className="menu-icon" />
        <Battery size={16} className="menu-icon" />
        <div className="menu-item clock">
          <Clock size={16} />
          <span className="menu-text">{formatTime(time)}</span>
        </div>
        <Search size={16} className="menu-icon" />
        <Radio size={16} className="menu-icon" />
      </div>
    </div>
  );
};

export default MenuBar;
