import React from "react";
import DockIcon from "./DockIcon";
import { useWindowManager } from "../../context/WindowManagerContext";
import SpotifyPlaylistContent from "../Apps/Finder/SpotifyPlaylistContent";
import ContactContent from "../Apps/Finder/ContactContent";
import "./Dock.css";

const Dock = () => {
  const { openWindow } = useWindowManager();

  const dockItems = [
    {
      id: "finder",
      icon: "/icons/finder.png",
      label: "Finder",
      action: () =>
        openWindow({
          title: "Finder",
          content: <div className="p-6 text-center">Finder window</div>,
          size: { width: 800, height: 600 },
        }),
    },
    {
      id: "safari",
      icon: "/icons/safari_icon.png",
      label: "Safari",
      action: () =>
        openWindow({
          title: "Safari",
          content: <div className="p-6 text-center">Safari window</div>,
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
      icon: "/icons/messages.png",
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
      icon: "/icons/mail_icon.png",
      label: "Mail",
      action: () => window.open("mailto:your.email@example.com", "_blank"),
    },
    {
      id: "contact",
      icon: "/icons/contacts_icon.png",
      label: "Contact",
      action: () =>
        openWindow({
          title: "Contact Me",
          windowType: "contact",
          content: <ContactContent />,
          size: { width: 750, height: 500 },
        }),
    },
    {
      id: "github",
      icon: "/icons/github.png",
      label: "GitHub",
      action: () => window.open("https://github.com/mykechen"),
    },
    {
      id: "linkedin",
      icon: "/icons/linkedin.png",
      label: "LinkedIn",
      action: () =>
        window.open("https://www.linkedin.com/in/myke-angelo-chen/"),
    },
    {
      id: "spotify",
      icon: "/icons/spotify.png",
      label: "Spotify",
      action: () => {
        const dockHeight = 120;
        const windowWidth = 400;
        const windowHeight = 600;
        const padding = 20;

        openWindow({
          title: "vibing",
          windowType: "spotify-playlist",
          content: <SpotifyPlaylistContent />,
          size: { width: windowWidth, height: windowHeight },
          position: {
            x: window.innerWidth - windowWidth - padding,
            y: window.innerHeight - dockHeight - windowHeight - padding,
          },
          noTitleBar: true,
        });
      },
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
            {index === 8 && <div className="dock-divider" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Dock;
