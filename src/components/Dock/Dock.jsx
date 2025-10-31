import React from "react";
import DockIcon from "./DockIcon";
import { useAppDispatch } from "../../store/hooks";
import { openWindow } from "../../store/windowManagerSlice";
import FinderContent from "../Apps/Finder/FinderContent";
import SpotifyPlaylistContent from "../Apps/Spotify/SpotifyPlaylistContent";
import ContactContent from "../Apps/Contact/ContactContent";
import PhotosContent from "../Apps/Photos/PhotosContent";
import MailContent from "../Apps/Mail/MailContent";
import MessagesContent from "../Apps/Messages/MessagesContent";
import SafariContent from "../Apps/Safari/SafariContent";
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
            windowType: "finder",
            content: <FinderContent initialFolder="projects" />,
            size: { width: 840, height: 490 },
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
            windowType: "safari",
            content: <SafariContent />,
            size: { width: 1000, height: 700 },
            noTitleBar: true,
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
        const paddingTop = 40;
        const gapAboveDock = 60; // Gap between window bottom and dock top

        // Calculate available space
        const windowTop = menuBarHeight + paddingTop;
        const dockTop = window.innerHeight - dockBottomOffset - dockHeight;
        const availableHeight = dockTop - gapAboveDock - windowTop;

        // Use full available height - 100% of available space
        const calculatedHeight = Math.round(availableHeight * 1.0);
        const windowHeight = Math.max(400, calculatedHeight);

        // Set a reasonable default width, but allow resizing
        const defaultWidth = 1000;
        const windowWidth = Math.min(defaultWidth, window.innerWidth * 0.85);

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
            windowType: "messages",
            content: <MessagesContent />,
            size: { width: 700, height: 600 },
          })
        ),
    },
    {
      id: "mail",
      icon: "/icons/mail_icon.png",
      label: "Mail",
      action: () => {
        dispatch(
          openWindow({
            title: "Mail",
            windowType: "mail",
            content: <MailContent />,
            size: { width: 1000, height: 600 },
          })
        );
      },
    },
    {
      id: "contact",
      icon: "/icons/contacts_icon.png",
      label: "Contact",
      action: () => {
        const menuBarHeight = 28;
        const windowWidth = 600;
        const windowHeight = 450;

        dispatch(
          openWindow({
            title: "Contact Me",
            windowType: "contact",
            content: <ContactContent />,
            size: { width: windowWidth, height: windowHeight },
            position: {
              x: Math.round((window.innerWidth - windowWidth) / 2),
              y: Math.round(
                (window.innerHeight - windowHeight - menuBarHeight) / 2 +
                  menuBarHeight
              ),
            },
          })
        );
      },
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
        const windowWidth = 360;
        const windowHeight = 560;
        const rightPadding = 60;
        const bottomPadding = -30; // Negative value to position even lower

        dispatch(
          openWindow({
            title: "vibing",
            windowType: "spotify-playlist",
            content: <SpotifyPlaylistContent />,
            size: { width: windowWidth, height: windowHeight },
            position: {
              x: window.innerWidth - windowWidth - rightPadding,
              y: window.innerHeight - dockHeight - windowHeight - bottomPadding,
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
