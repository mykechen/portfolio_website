import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { openWindow } from "../../store/windowManagerSlice";
import DesktopIcon from "./DesktopIcon";
import Window from "../Window/Window";
import Dock from "../Dock/Dock";
import StickyNote from "./StickyNote";
import ProjectsContent from "../Apps/Finder/ProjectsContent";
import CertificationsContent from "../Apps/Finder/CertificationsContent";
import AboutContent from "../Apps/Finder/AboutContent";
import ImageViewer from "../Apps/Finder/ImageViewer";
import "./Desktop.css";

const Desktop = () => {
  const dispatch = useAppDispatch();
  const windows = useAppSelector((state) => state.windowManager.windows);

  // Generate random positions within screen bounds
  const generateRandomPosition = (index) => {
    const iconWidth = 100;
    const iconHeight = 100; // approximate height including icon + label
    const menuBarHeight = 28;
    const dockHeight = 120; // dock height + margin
    const padding = 20;

    const minX = padding;
    const maxX = window.innerWidth - iconWidth - padding;
    const minY = menuBarHeight + padding;
    const maxY = window.innerHeight - dockHeight - iconHeight - padding;

    // Add some randomness based on index to avoid overlapping
    const baseX = minX + Math.random() * (maxX - minX);
    const baseY = minY + Math.random() * (maxY - minY);

    // Add slight offset based on index to spread them out
    const offsetX = (index % 3) * 50;
    const offsetY = Math.floor(index / 3) * 60;

    return {
      x: Math.max(minX, Math.min(maxX, baseX + offsetX)),
      y: Math.max(minY, Math.min(maxY, baseY + offsetY)),
    };
  };

  const desktopItems = useMemo(() => {
    const items = [
      {
        icon: "/icons/folder_icon.png",
        label: "Project1",
        type: "project1",
      },
      {
        icon: "/icons/folder_icon.png",
        label: "Project2",
        type: "project2",
      },
      {
        icon: "/icons/folder_icon.png",
        label: "Project3",
        type: "project3",
      },
      {
        icon: "/icons/folder_icon.png",
        label: "Certifications",
        type: "certifications",
      },
      {
        icon: "/images/3d isometric avatar.png",
        label: "About Me",
        type: "about",
      },
      {
        icon: "/icons/pdf.png",
        label: "SWE Resume",
        type: "swe-resume",
      },
      {
        icon: "/icons/pdf.png",
        label: "PM Resume",
        type: "pm-resume",
      },
    ];

    return items.map((item, index) => ({
      ...item,
      initialPosition: generateRandomPosition(index),
    }));
  }, []);

  const handleDoubleClick = (type) => {
    if (type === "project1") {
      dispatch(
        openWindow({
          title: "Project1",
          windowType: "project1",
          content: <ProjectsContent />,
          size: { width: 900, height: 700 },
        })
      );
    } else if (type === "project2") {
      dispatch(
        openWindow({
          title: "Project2",
          windowType: "project2",
          content: <ProjectsContent />,
          size: { width: 900, height: 700 },
        })
      );
    } else if (type === "project3") {
      dispatch(
        openWindow({
          title: "Project3",
          windowType: "project3",
          content: <ProjectsContent />,
          size: { width: 900, height: 700 },
        })
      );
    } else if (type === "certifications") {
      dispatch(
        openWindow({
          title: "Certifications",
          windowType: "certifications",
          content: <CertificationsContent />,
          size: { width: 900, height: 700 },
        })
      );
    } else if (type === "about") {
      // Generate a unique group ID for all About Me windows
      const aboutGroupId = `about-${Date.now()}`;

      // Calculate the centered position for the main text window
      const aboutWindowWidth = 700;
      const aboutWindowHeight = 600;
      const centerX = (window.innerWidth - aboutWindowWidth) / 2;
      const centerY = (window.innerHeight - aboutWindowHeight) / 2;

      // Define the text window bounds to avoid
      const textWindowBounds = {
        left: centerX,
        right: centerX + aboutWindowWidth,
        top: centerY,
        bottom: centerY + aboutWindowHeight,
      };

      // Open 3 image windows from the about folder first
      const aboutImages = [
        "/images/about/image1.jpg",
        "/images/about/image2.JPG",
        "/images/about/image3.JPG",
      ];

      const imageWindowWidth = 400;
      const imageWindowHeight = 350;
      const menuBarHeight = 28;
      const dockHeight = 120;
      const padding = 20;

      // Calculate positions: 2 images on LEFT, 1 image on RIGHT
      // All must avoid the centered text window

      // Left side: Position images to the left of the text window
      const leftX = Math.max(padding, centerX - imageWindowWidth - padding);

      // Left image 1: Top (aligned with top of text window area)
      const leftImage1Y = Math.max(
        menuBarHeight + padding,
        centerY - imageWindowHeight / 2
      );
      const position1 = {
        x: leftX,
        y: leftImage1Y,
      };

      // Left image 2: Bottom (aligned with bottom of text window area, ensuring no overlap)
      const gapBetweenImages = 20;
      const leftImage2Y = Math.max(
        position1.y + imageWindowHeight + gapBetweenImages,
        centerY + aboutWindowHeight / 2 - imageWindowHeight / 2
      );

      // Ensure left image 2 doesn't go below dock
      const leftImage2YFinal = Math.min(
        leftImage2Y,
        window.innerHeight - dockHeight - imageWindowHeight - padding
      );

      const position2 = {
        x: leftX,
        y: leftImage2YFinal,
      };

      // Right side: Position image to the right of the text window, vertically centered
      const rightX = textWindowBounds.right + padding;
      // Center vertically with the text window
      const rightY = centerY + (aboutWindowHeight - imageWindowHeight) / 2;

      // Ensure it fits on screen
      const rightXFinal = Math.min(
        rightX,
        window.innerWidth - imageWindowWidth - padding
      );
      const rightYFinal = Math.max(
        menuBarHeight + padding,
        Math.min(
          rightY,
          window.innerHeight - dockHeight - imageWindowHeight - padding
        )
      );

      const position3 = {
        x: rightXFinal,
        y: rightYFinal,
      };

      // Fixed positions array: 2 on left, 1 on right
      const fixedPositions = [position1, position2, position3];

      // Open all image windows immediately with fixed positions
      for (let index = 0; index < aboutImages.length; index++) {
        const imagePath = aboutImages[index];
        const imageName = imagePath.split("/").pop();
        dispatch(
          openWindow({
            title: imageName,
            content: <ImageViewer imagePath={imagePath} />,
            size: { width: imageWindowWidth, height: imageWindowHeight },
            position: fixedPositions[index],
            groupId: aboutGroupId,
          })
        );
      }

      // Open the main About Me window last (so it appears on top) and centered
      dispatch(
        openWindow({
          title: "About Me",
          windowType: "about",
          content: <AboutContent />,
          size: { width: aboutWindowWidth, height: aboutWindowHeight },
          position: {
            x: centerX,
            y: centerY,
          },
          groupId: aboutGroupId,
        })
      );
    } else if (type === "swe-resume") {
      window.open("/Myke Chen Resume SWE.pdf", "_blank");
    } else if (type === "pm-resume") {
      window.open("/Myke Chen Resume PM.pdf", "_blank");
    }
  };

  return (
    <div className="desktop">
      <div className="desktop-background" />

      <div className="desktop-title">
        <h1 className="desktop-title-header">hello world, this is myke</h1>
        <p className="desktop-title-subtitle">welcome to my portfolio</p>
      </div>

      <div className="desktop-content">
        <StickyNote />
        {desktopItems.map((item) => (
          <DesktopIcon
            key={item.type}
            icon={item.icon}
            label={item.label}
            initialPosition={item.initialPosition}
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
