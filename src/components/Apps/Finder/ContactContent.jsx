import React from "react";
import { SiGithub, SiLinkedin, SiInstagram } from "react-icons/si";
import "./ContactContent.css";

const ContactContent = () => {
  return (
    <div className="contact-content">
      <div className="contact-layout">
        <div className="contact-left">
          <h1 className="contact-name">Myke A. Chen</h1>
          <p className="contact-title">CS and Business @ USC</p>

          <div className="contact-info-grid">
            <div className="contact-info-item">
              <p className="contact-label">Phone</p>
              <p className="contact-value">224 515 0220</p>
            </div>
            <div className="contact-info-item">
              <p className="contact-label">Email</p>
              <p className="contact-value">mykechen@usc.edu</p>
            </div>
          </div>

          <div className="social-icons">
            <a
              href="https://www.linkedin.com/in/myke-angelo-chen/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="LinkedIn"
            >
              <SiLinkedin />
            </a>
            <a
              href="https://github.com/mykechen"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="GitHub"
            >
              <SiGithub />
            </a>
            <a
              href="https://www.instagram.com/mikah_33/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Instagram"
            >
              <SiInstagram />
            </a>
          </div>
        </div>

        <div className="contact-right">
          <div className="profile-picture">
            <img
              src="/images/contact/myke_chen_headshot.jpeg"
              alt="Myke A. Chen"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300?text=Myke+A.+Chen";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactContent;
