import React, { useEffect } from "react";
import { HiDesktopComputer } from "react-icons/hi";
import "./MobileWarningModal.css";

const MobileWarningModal = ({ isVisible, setIsVisible }) => {
  useEffect(() => {
    // Check if user is on mobile or tablet
    const checkDevice = () => {
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const isSmallScreen = window.innerWidth < 1024; // Less than typical desktop width

      // Check if user has already dismissed the modal in this session
      const hasDismissed = sessionStorage.getItem("mobileWarningDismissed");

      if ((isMobile || isSmallScreen) && !hasDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, [setIsVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("mobileWarningDismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="mobile-warning-overlay">
      <div className="mobile-warning-modal">
        <div className="mobile-warning-icon">
          <HiDesktopComputer />
        </div>

        <h2 className="mobile-warning-title">Best Viewed on a Desktop</h2>

        <p className="mobile-warning-text">
          This portfolio is intentionally designed to replicate a macOS desktop experience.
          For the full vibe, explore it on a larger screen.
        </p>

        <p className="mobile-warning-subtext">
          You can still browse on this device, but some features may not work as intended.
        </p>

        <button className="mobile-warning-button" onClick={handleDismiss}>
          Continue Anyway →
        </button>
      </div>
    </div>
  );
};

export default MobileWarningModal;
