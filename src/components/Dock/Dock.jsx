import React from "react";
import DockIcon from "./DockIcon";
import { useWindowManager } from "../../context/WindowManagerContext";
import "./Dock.css";

const Dock = () => {
  const { openWindow } = useWindowManager();

  const dockItems = [
    {
      id: "finder",
      icon: "/icons/finder_logo.png",
      label: "Finder",
      action: () =>
        openWindow({
          title: "Finder",
          content: <div className="p-6 text-center">Finder window</div>,
          size: { width: 800, height: 600 },
        }),
    },
    {
      id: "photos",
      icon: "/icons/photos_icon.png",
      label: "Photos",
      action: () =>
        openWindow({
          title: "Photos",
          content: <div className="p-6 text-center">Photos gallery</div>,
          size: { width: 900, height: 700 },
        }),
    },
    {
      id: "messages",
      icon: "/icons/messages_logo.png",
      label: "Messages",
      action: () =>
        openWindow({
          title: "Messages",
          content: <div className="p-6 text-center">Contact form</div>,
          size: { width: 700, height: 600 },
        }),
    },
    {
      id: "mail",
      icon: "/icons/mail_logo.png",
      label: "Mail",
      action: () => window.open("mailto:your.email@example.com", "_blank"),
    },
    {
      id: "github",
      icon: "/icons/github_logo.png",
      label: "GitHub",
      action: () => window.open("https://github.com", "_blank"),
    },
    {
      id: "linkedin",
      icon: "/icons/linkedin_logo.png",
      label: "LinkedIn",
      action: () => window.open("https://linkedin.com", "_blank"),
    },
    {
      id: "spotify",
      icon: "/icons/spotify_logo.png",
      label: "Spotify",
      action: () => window.open("https://open.spotify.com", "_blank"),
    },
    {
      id: "trash",
      icon: "/icons/trash_icon.png",
      label: "Trash",
      action: () => console.log("Trash clicked"),
    },
  ];

  return (
    <div className="dock">
      <div className="dock-inner">
        {dockItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <DockIcon
              icon={item.icon}
              label={item.label}
              onClick={item.action}
            />
            {index === 6 && <div className="dock-divider" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Dock;
