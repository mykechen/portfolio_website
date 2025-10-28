import React from "react";
import { useWindowManager } from "../../context/WindowManagerContext";
import DesktopIcon from "./DesktopIcon";
import Window from "../Window/Window";
import Dock from "../Dock/Dock";
import ProjectsContent from "../Apps/Finder/ProjectsContent";
import CertificationsContent from "../Apps/Finder/CertificationsContent";
import AboutContent from "../Apps/Finder/AboutContent";
import ResumeViewer from "../Apps/Finder/ResumeViewer";
import "./Desktop.css";

const Desktop = () => {
  const { windows, openWindow } = useWindowManager();

  const desktopItems = [
    {
      icon: "📁",
      label: "Projects",
      type: "projects",
      position: { gridColumn: "1", gridRow: "1" },
    },
    {
      icon: "📜",
      label: "Certifications",
      type: "certifications",
      position: { gridColumn: "1", gridRow: "2" },
    },
    {
      icon: "👤",
      label: "About Me",
      type: "about",
      position: { gridColumn: "1", gridRow: "3" },
    },
    {
      icon: "📄",
      label: "Resume.pdf",
      type: "resume",
      position: { gridColumn: "1", gridRow: "4" },
    },
  ];

  const handleDoubleClick = (type) => {
    if (type === "projects") {
      openWindow({
        title: "Projects",
        content: <ProjectsContent />,
        size: { width: 900, height: 700 },
      });
    } else if (type === "certifications") {
      openWindow({
        title: "Certifications",
        content: <CertificationsContent />,
        size: { width: 900, height: 700 },
      });
    } else if (type === "about") {
      openWindow({
        title: "About Me",
        content: <AboutContent />,
        size: { width: 700, height: 600 },
      });
    } else if (type === "resume") {
      openWindow({
        title: "Resume.pdf",
        content: <ResumeViewer />,
        size: { width: 900, height: 1100 },
      });
    }
  };

  return (
    <div className="desktop">
      <div
        className="desktop-background"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#0a0a0a",
        }}
      />

      <div className="desktop-content">
        {desktopItems.map((item) => (
          <DesktopIcon
            key={item.type}
            icon={item.icon}
            label={item.label}
            onDoubleClick={() => handleDoubleClick(item.type)}
          />
        ))}
      </div>

      {windows.map(
        (window) =>
          !window.minimized && (
            <Window
              key={window.id}
              id={window.id}
              title={window.title}
              content={window.content}
            />
          )
      )}

      <Dock />
    </div>
  );
};

export default Desktop;
