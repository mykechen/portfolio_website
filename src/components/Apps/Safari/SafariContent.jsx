import React from "react";
import {
  MdChevronLeft,
  MdChevronRight,
  MdRefresh,
  MdShare,
  MdAdd,
  MdGridView
} from "react-icons/md";
import {
  RiSidebarFoldLine,
  RiShieldLine
} from "react-icons/ri";
import { experiences } from "./experiencesData";
import "./SafariContent.css";

const SafariContent = ({ onClose, onMinimize, onMaximize }) => {
  return (
    <div className="safari-container">
      {/* Safari Integrated Title Bar + Toolbar */}
      <div className="safari-titlebar">
        {/* Traffic Lights */}
        <div className="safari-traffic-lights">
          <button
            className="traffic-light traffic-light-close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="Close"
          />
          <button
            className="traffic-light traffic-light-minimize"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            aria-label="Minimize"
          />
          <button
            className="traffic-light traffic-light-maximize"
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
            aria-label="Maximize"
          />
        </div>

        {/* Left Controls */}
        <div className="safari-toolbar-left">
          <button className="safari-sidebar-btn">
            <RiSidebarFoldLine />
          </button>
          <button className="safari-nav-btn" disabled>
            <MdChevronLeft />
          </button>
          <button className="safari-nav-btn" disabled>
            <MdChevronRight />
          </button>
        </div>

        {/* Center Search Bar */}
        <div className="safari-url-bar">
          <RiShieldLine className="safari-shield" />
          <input
            type="text"
            className="safari-search-input"
            placeholder="Search or enter website name"
            value="mykechen.com/experience"
            readOnly
          />
          <MdRefresh className="safari-refresh" />
        </div>

        {/* Right Action Buttons */}
        <div className="safari-toolbar-right">
          <button className="safari-action-btn">
            <MdShare />
          </button>
          <button className="safari-action-btn">
            <MdAdd />
          </button>
          <button className="safari-action-btn">
            <MdGridView />
          </button>
        </div>
      </div>

      {/* Safari Content Area */}
      <div className="safari-content">
        <div className="experience-container">
          <h1 className="experience-title">Work Experience</h1>

          <div className="experience-timeline">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="experience-card">
                <div className="experience-header">
                  <div className="experience-company-info">
                    <h2 className="experience-company">{exp.company}</h2>
                    <p className="experience-role">{exp.role}</p>
                    <p className="experience-location">{exp.location}</p>
                  </div>
                  <div className="experience-duration">{exp.duration}</div>
                </div>

                <p className="experience-description">{exp.description}</p>

                <ul className="experience-bullets">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>

                <div className="experience-skills">
                  {exp.skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>

                {index < experiences.length - 1 && (
                  <div className="experience-divider"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafariContent;
