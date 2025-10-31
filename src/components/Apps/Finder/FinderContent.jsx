import React, { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { MdComputer } from "react-icons/md";
import { useAppDispatch } from "../../../store/hooks";
import { openWindow } from "../../../store/windowManagerSlice";
import "./FinderContent.css";
import "./ProjectsContent.css";

const FinderContent = ({
  initialFolder = "desktop",
  setNavigationControls,
  setDynamicTitle,
}) => {
  const [selectedProject, setSelectedProject] = useState(initialFolder);
  const [history, setHistory] = useState([initialFolder]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const dispatch = useAppDispatch();

  const desktopItems = [
    {
      id: "desktop",
      name: "Desktop",
      icon: <MdComputer />,
      type: "react-icon",
    },
  ];

  const projects = [
    {
      id: "easycal",
      name: "EasyCal",
      icon: "/icons/folder_icon.png",
    },
    {
      id: "project2",
      name: "homi",
      icon: "/icons/folder_icon.png",
    },
  ];

  const certifications = [
    {
      id: "certifications",
      name: "Certifications",
      icon: "/icons/folder_icon.png",
    },
  ];

  // Project details data
  const projectDetails = {
    easycal: {
      description:
        "EasyCal is a Chrome extension that lets users create and view Google Calendar events directly from their browser's sidepanel—no extra tabs needed. It’s built to make scheduling faster, simpler, and seamlessly integrated into your daily workflow. It integrates with Google’s APIs for event creation and OCR-based schedule detection, focusing on a fast, intuitive experience designed in Figma.",
      skills: [
        "JavaScript",
        "HTML/CSS",
        "UI/UX Design (Figma)",
        "API Integration",
        "Chrome Extension Development",
        "OCR",
      ],
    },
    project2: {
      description:
        "homi is an AI roommate currently in development — a voice-powered companion that helps users stay emotionally grounded and productive through meaningful daily conversations. Designed to blend technology with empathy, it features persistent memory, real-time chat, and a clean mobile experience that grows with each interaction.",
      skills: [
        "React Native",
        "FastAPI",
        "Supabase",
        "OpenAI API Integration",
        "TailwindCSS (NativeWind)",
        "Voice AI",
        "JWT Security",
        "Mobile App Development",
        "UX/UI Design",
      ],
    },
    "ml-certification": {
      description:
        "Took the Supervised Machine Learning: Regression and Classification course on Coursera, where I learned how to build and train machine learning models using Python, NumPy, and scikit-learn. Explored how linear and logistic regression can be used to make predictions and solve real-world classification problems.",
      skills: [
        "Scikit Learn (Machine Learning Library)",
        "Supervised Learning",
        "Regression Analysis",
        "NumPy",
        "Classification And Regression Tree (CART)",
        "Machine Learning",
        "Artificial Intelligence",
        "Jupyter",
        "Predictive Modeling",
        "Feature Engineering",
        "Statistical Modeling",
        "Applied Machine Learning",
      ],
    },
  };

  // Content for each project
  const projectContent = {
    desktop: [
      {
        id: "easycal",
        name: "EasyCal",
        icon: "/icons/folder_icon.png",
        type: "folder",
      },
      {
        id: "project2",
        name: "homi",
        icon: "/icons/folder_icon.png",
        type: "folder",
      },
      {
        id: "certifications",
        name: "Certifications",
        icon: "/icons/folder_icon.png",
        type: "folder",
      },
      {
        id: "resume-swe",
        name: "Resume_SWE.pdf",
        icon: "/icons/pdf.png",
        type: "link",
        url: "public/Myke Chen Resume SWE.pdf",
      },
      {
        id: "resume-pm",
        name: "Resume_PM.pdf",
        icon: "/icons/pdf.png",
        type: "link",
        url: "public/Myke Chen Resume PM.pdf",
      },
    ],
    easycal: [
      {
        id: "details",
        name: "Details.txt",
        icon: "/icons/text_file_icon.png",
        type: "file",
      },
      {
        id: "visit",
        name: "Visit Project",
        icon: "/icons/safari_icon.png",
        type: "link",
        url: "https://easycal.pro",
      },
    ],
    project2: [
      {
        id: "details",
        name: "Details.txt",
        icon: "/icons/text_file_icon.png",
        type: "file",
      },
      {
        id: "visit",
        name: "Visit Project",
        icon: "/icons/safari_icon.png",
        type: "link",
        url: "https://heyhomi.app",
      },
    ],
    certifications: [
      {
        id: "ml-certification",
        name: "Supervised Machine Learning: Regression and Classification",
        icon: "/icons/folder_icon.png",
        type: "folder",
      },
    ],
    "ml-certification": [
      {
        id: "details",
        name: "Details.txt",
        icon: "/icons/text_file_icon.png",
        type: "file",
      },
      {
        id: "certificate",
        name: "Certificate.pdf",
        icon: "/icons/pdf.png",
        type: "link",
        url: "/images/certifications/Coursera_ML_Certificate.pdf",
      },
      {
        id: "visit",
        name: "Visit Certificate",
        icon: "/icons/safari_icon.png",
        type: "link",
        url: "https://coursera.org/share/1c93ec823aeaa1895ccb5e61b221dd84",
      },
    ],
  };

  const currentContent = projectContent[selectedProject] || [];

  // Get display name for current folder
  const getCurrentFolderName = () => {
    const allItems = [
      ...desktopItems,
      ...projects,
      ...certifications,
      { id: "ml-certification", name: "Supervised Machine Learning" },
    ];
    const current = allItems.find((item) => item.id === selectedProject);
    return current ? current.name : "Finder";
  };

  // Navigate to a folder and update history
  const navigateToFolder = (folderId) => {
    if (folderId === selectedProject) return;

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(folderId);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setSelectedProject(folderId);
  };

  // Handle back navigation
  const handleBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setSelectedProject(history[newIndex]);
    }
  };

  // Handle forward navigation
  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setSelectedProject(history[newIndex]);
    }
  };

  // Update navigation controls and title when folder changes
  useEffect(() => {
    if (setNavigationControls && setDynamicTitle) {
      const controls = (
        <div className="finder-nav-controls">
          <button
            className="finder-nav-btn"
            onClick={handleBack}
            disabled={historyIndex === 0}
            aria-label="Back"
          >
            <MdChevronLeft />
          </button>
          <button
            className="finder-nav-btn"
            onClick={handleForward}
            disabled={historyIndex === history.length - 1}
            aria-label="Forward"
          >
            <MdChevronRight />
          </button>
        </div>
      );
      setNavigationControls(controls);
      setDynamicTitle(getCurrentFolderName());
    }
  }, [selectedProject, historyIndex, history]);

  const handleItemClick = (item, e) => {
    // Stop propagation to prevent the Finder window from coming to front
    e.stopPropagation();

    if (item.type === "folder") {
      // Navigate into the folder
      navigateToFolder(item.id);
    } else if (item.type === "link" && item.url) {
      window.open(item.url, "_blank");
    } else if (item.type === "file") {
      // Open details window
      const details = projectDetails[selectedProject];
      if (details) {
        const projectName =
          selectedProject === "easycal"
            ? "EasyCal"
            : selectedProject === "project2"
            ? "homi"
            : "Supervised Machine Learning";

        // Get logo path based on project
        const logoPath =
          selectedProject === "easycal"
            ? "/images/projects/easycal_logo.png"
            : selectedProject === "project2"
            ? "/images/projects/homi_logo.svg"
            : null;

        const detailsContent = (
          <div
            style={{
              height: "100%",
              overflowY: "auto",
              backgroundColor: "#ffffff",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif",
              padding: "48px 40px",
              scrollbarWidth: "none", // Firefox
              msOverflowStyle: "none", // IE and Edge
            }}
            className="details-txt-content"
          >
            {/* Logo */}
            {logoPath && (
              <div style={{ marginBottom: "24px" }}>
                <img
                  src={logoPath}
                  alt={`${projectName} logo`}
                  style={{
                    height: "64px",
                    width: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}

            {/* Header */}
            <h2
              style={{
                fontSize: "32px",
                fontWeight: "600",
                color: "#1d1d1f",
                margin: "0 0 24px 0",
                letterSpacing: "-0.5px",
              }}
            >
              {projectName}
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: "17px",
                lineHeight: "1.6",
                color: "#6e6e73",
                margin: "0 0 28px 0",
                fontStyle: "italic",
                fontWeight: "400",
              }}
            >
              {details.description}
            </p>

            {/* Skills */}
            <div style={{ marginTop: "28px" }}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {details.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="skill-pill"
                    style={{
                      padding: "8px 16px",
                      background:
                        "linear-gradient(135deg, rgba(0, 122, 255, 0.06), rgba(90, 200, 250, 0.06))",
                      color: "#007AFF",
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: "500",
                      border: "1px solid rgba(0, 122, 255, 0.12)",
                      letterSpacing: "0.2px",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

        dispatch(
          openWindow({
            title: "Details.txt",
            windowType: `details-${selectedProject}`,
            content: detailsContent,
            size: { width: 550, height: 650 },
          })
        );
      }
    }
  };

  return (
    <div className="finder-container">
      {/* Sidebar */}
      <div className="finder-sidebar">
        <div className="finder-sidebar-section">
          <div className="finder-sidebar-header">Favorites</div>
          {desktopItems.map((item) => (
            <div
              key={item.id}
              className={`finder-sidebar-item ${
                selectedProject === item.id ? "active" : ""
              }`}
              onClick={() => navigateToFolder(item.id)}
            >
              {item.type === "react-icon" ? (
                <div className="finder-sidebar-icon-react">{item.icon}</div>
              ) : (
                <img
                  src={item.icon}
                  alt={item.name}
                  className="finder-sidebar-icon"
                />
              )}
              <span className="finder-sidebar-label">{item.name}</span>
            </div>
          ))}
        </div>

        <div className="finder-sidebar-section">
          <div className="finder-sidebar-header">Projects</div>
          {projects.map((project) => (
            <div
              key={project.id}
              className={`finder-sidebar-item ${
                selectedProject === project.id ? "active" : ""
              }`}
              onClick={() => navigateToFolder(project.id)}
            >
              <img
                src={project.icon}
                alt={project.name}
                className="finder-sidebar-icon"
              />
              <span className="finder-sidebar-label">{project.name}</span>
            </div>
          ))}
        </div>

        <div className="finder-sidebar-section">
          <div className="finder-sidebar-header">Certifications</div>
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className={`finder-sidebar-item ${
                selectedProject === cert.id ||
                selectedProject === "ml-certification"
                  ? "active"
                  : ""
              }`}
              onClick={() => navigateToFolder(cert.id)}
            >
              <img
                src={cert.icon}
                alt={cert.name}
                className="finder-sidebar-icon"
              />
              <span className="finder-sidebar-label">{cert.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="finder-content">
        <div className="finder-content-body">
          <div className="projects-content">
            <div className="projects-grid">
              {currentContent.map((item) => (
                <div
                  key={item.id}
                  className="project-folder"
                  onClick={(e) => handleItemClick(item, e)}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="project-folder-icon"
                  />
                  <div className="project-folder-name">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinderContent;
