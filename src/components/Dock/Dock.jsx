import React from "react";
import DockIcon from "./DockIcon";
import { useAppDispatch } from "../../store/hooks";
import { openWindow } from "../../store/windowManagerSlice";
import SpotifyPlaylistContent from "../Apps/Finder/SpotifyPlaylistContent";
import ContactContent from "../Apps/Finder/ContactContent";
import PhotosContent from "../Apps/Finder/PhotosContent";
import "./Dock.css";

const Dock = () => {
  const dispatch = useAppDispatch();

  const dockItems = [
    {
      id: "finder",
      icon: "/icons/finder.png",
      label: "Finder",
      action: () =>
        dispatch(
          openWindow({
            title: "Finder",
            content: <div className="p-6 text-center">Finder window</div>,
            size: { width: 800, height: 600 },
          })
        ),
    },
    {
      id: "safari",
      icon: "/icons/safari_icon.png",
      label: "Safari",
      action: () =>
        dispatch(
          openWindow({
            title: "Safari",
            content: <div className="p-6 text-center">Safari window</div>,
            size: { width: 800, height: 600 },
          })
        ),
    },
    {
      id: "photos",
      icon: "/icons/photos_icon.png",
      label: "Photos",
      action: () => {
        const menuBarHeight = 28;
        const dockHeight = 80;
        const dockBottomOffset = 20; // Dock is positioned 20px from bottom
        const paddingTop = 20;
        const paddingBottom = 20;

        // Calculate available space
        const windowTop = menuBarHeight + paddingTop;
        const dockTop = window.innerHeight - dockBottomOffset - dockHeight;
        const maxWindowHeight = dockTop - paddingBottom - windowTop;

        // Use 50% of available space, ensure it's a valid number
        const windowHeight = Math.max(400, Math.round(maxWindowHeight * 0.5));

        // Set a reasonable default width, but allow resizing
        const defaultWidth = 1200;
        const windowWidth = Math.min(defaultWidth, window.innerWidth * 0.9);

        dispatch(
          openWindow({
            title: "Photos",
            windowType: "photos",
            content: <PhotosContent />,
            size: { width: Math.round(windowWidth), height: windowHeight },
            position: {
              x: Math.round((window.innerWidth - windowWidth) / 2),
              y: windowTop,
            },
          })
        );
      },
    },
    {
      id: "messages",
      icon: "/icons/messages.png",
      label: "Messages",
      action: () =>
        dispatch(
          openWindow({
            title: "Messages",
            content: <div className="p-6 text-center">Contact form</div>,
            size: { width: 700, height: 600 },
          })
        ),
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
        dispatch(
          openWindow({
            title: "Contact Me",
            windowType: "contact",
            content: <ContactContent />,
            size: { width: 750, height: 500 },
          })
        ),
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

        dispatch(
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
          })
        );
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
