import React, { useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { openWindow } from "../../../store/windowManagerSlice";
import "./FinderContent.css";
import "./ProjectsContent.css";

const FinderContent = ({ initialFolder = "easycal" }) => {
  const [selectedProject, setSelectedProject] = useState(initialFolder);
  const dispatch = useAppDispatch();

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
    {
      id: "project3",
      name: "Project3",
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
      description: "A calendar management application that simplifies scheduling and event planning.",
      skills: ["React", "Node.js", "MongoDB", "Express"],
    },
    project2: {
      description: "homi project description",
      skills: ["React", "Firebase"],
    },
    project3: {
      description: "Project3 description",
      skills: ["JavaScript", "CSS"],
    },
  };

  // Content for each project
  const projectContent = {
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
    project3: [],
    certifications: [],
  };

  const currentContent = projectContent[selectedProject] || [];

  const handleItemClick = (item) => {
    if (item.type === "link" && item.url) {
      window.open(item.url, "_blank");
    } else if (item.type === "file") {
      // Open details window
      const details = projectDetails[selectedProject];
      if (details) {
        const detailsContent = (
          <div style={{ padding: "20px", fontFamily: "monospace", lineHeight: "1.6" }}>
            <p style={{ marginBottom: "20px", color: "#333" }}>
              {details.description}
            </p>
            <p style={{ marginBottom: "10px", fontWeight: "bold", color: "#333" }}>
              Skills:
            </p>
            <ul style={{ marginBottom: "20px", color: "#333", paddingLeft: "20px" }}>
              {details.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
            <p style={{ color: "#007aff", fontStyle: "italic" }}>
              Click the Safari link to check it out!
            </p>
          </div>
        );

        dispatch(
          openWindow({
            title: "Details.txt",
            content: detailsContent,
            size: { width: 400, height: 350 },
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
          <div className="finder-sidebar-header">Projects</div>
          {projects.map((project) => (
            <div
              key={project.id}
              className={`finder-sidebar-item ${
                selectedProject === project.id ? "active" : ""
              }`}
              onClick={() => setSelectedProject(project.id)}
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
                selectedProject === cert.id ? "active" : ""
              }`}
              onClick={() => setSelectedProject(cert.id)}
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
                  onClick={() => handleItemClick(item)}
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
