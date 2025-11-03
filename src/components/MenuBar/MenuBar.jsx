import React, { useState, useEffect, useRef } from "react";
import { useAppDispatch } from "../../store/hooks";
import { openWindow } from "../../store/windowManagerSlice";
import ContactContent from "../Apps/Contact/ContactContent";
import { IoBatteryFull } from "react-icons/io5";
import "./MenuBar.css";

const MenuBar = () => {
  const [time, setTime] = useState(new Date());
  const [showResumeDropdown, setShowResumeDropdown] = useState(false);
  const [isClosingDropdown, setIsClosingDropdown] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Close dropdowns when clicking outside
  const resumeMenuRef = useRef(null);

  const closeDropdown = () => {
    setIsClosingDropdown(true);
    setTimeout(() => {
      setShowResumeDropdown(false);
      setIsClosingDropdown(false);
    }, 200); // Match animation duration
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        resumeMenuRef.current &&
        !resumeMenuRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    };

    if (showResumeDropdown && !isClosingDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showResumeDropdown, isClosingDropdown]);

  const handleResumeClick = (type) => {
    if (type === "swe") {
      window.open("/Myke Chen Resume SWE.pdf", "_blank");
    } else if (type === "pm") {
      window.open("/Myke Chen Resume PM.pdf", "_blank");
    }
    closeDropdown();
  };

  const toggleDropdown = () => {
    if (showResumeDropdown) {
      closeDropdown();
    } else {
      setShowResumeDropdown(true);
    }
  };

  const formatTime = (date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, "0");

    return `${day} ${month} ${dayOfMonth} ${displayHours}:${displayMinutes} ${ampm}`;
  };

  return (
    <div className="menu-bar">
      <div className="menu-bar-left">
        <button
          className="menu-item apple-logo"
          onClick={() => window.location.reload()}
          aria-label="Refresh page"
        >
          <img src="/icons/apple_logo.png" alt="Apple" width="16" height="16" />
        </button>
        <button
          className="menu-item"
          onClick={() => window.location.reload()}
          aria-label="Refresh page"
        >
          <span className="menu-text">Myke Angelo Chen's Portfolio</span>
        </button>
        <button
          className="menu-item"
          onClick={() => {
            const menuBarHeight = 28;
            const windowWidth = 620;
            const windowHeight = 560;

            dispatch(
              openWindow({
                title: "Contact Me",
                windowType: "contact",
                content: <ContactContent />,
                size: { width: windowWidth, height: windowHeight },
                position: {
                  x: Math.round((window.innerWidth - windowWidth) / 2),
                  y: Math.round((window.innerHeight - windowHeight - menuBarHeight) / 2 + menuBarHeight),
                },
              })
            );
          }}
          aria-label="Contact"
        >
          <span className="menu-text">Contact</span>
        </button>
        <div
          ref={resumeMenuRef}
          className="menu-item menu-item-with-dropdown"
          style={{ position: "relative" }}
        >
          <button
            className="menu-item-button"
            onClick={toggleDropdown}
            aria-label="Resume"
          >
            <span className="menu-text">Resume</span>
          </button>
          {showResumeDropdown && (
            <div className={`menu-dropdown ${isClosingDropdown ? 'closing' : ''}`}>
              <button
                className="dropdown-item"
                onClick={() => handleResumeClick("swe")}
              >
                <span className="menu-text">SWE</span>
              </button>
              <button
                className="dropdown-item"
                onClick={() => handleResumeClick("pm")}
              >
                <span className="menu-text">PM</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="menu-bar-right">
        <div className="menu-item battery-icon" aria-label="Battery">
          <IoBatteryFull size={16} />
        </div>
        <div className="menu-item" aria-label="WiFi">
          <img
            src="/icons/wifi_icon.png"
            alt="WiFi"
            width="14"
            height="14"
            className="menu-icon"
          />
        </div>
        <div className="menu-item" aria-label="Search">
          <img
            src="/icons/search_icon.png"
            alt="Search"
            width="14"
            height="14"
            className="menu-icon"
          />
        </div>
        <div className="menu-item" aria-label="Profile">
          <img
            src="/icons/profile_icon.png"
            alt="Profile"
            width="14"
            height="14"
            className="menu-icon"
          />
        </div>
        <div className="menu-item" aria-label="Control Center">
          <img
            src="/icons/control_center_icon.png"
            alt="Control Center"
            width="14"
            height="14"
            className="menu-icon"
          />
        </div>
        <div className="menu-item" aria-label="Siri">
          <img
            src="/icons/siri_icon.png"
            alt="Siri"
            width="14"
            height="14"
            className="menu-icon"
          />
        </div>
        <div className="menu-item clock">
          <span className="menu-text">{formatTime(time)}</span>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
