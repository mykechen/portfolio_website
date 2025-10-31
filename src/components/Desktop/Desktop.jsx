import React, { useMemo, useState, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { openWindow } from "../../store/windowManagerSlice";
import DesktopIcon from "./DesktopIcon";
import Dock from "../Dock/Dock";
import StickyNote from "./StickyNote";
import FinderContent from "../Apps/Finder/FinderContent";
import AboutContent from "../Apps/Finder/AboutContent";
import ImageViewer from "../Apps/Finder/ImageViewer";
import "./Desktop.css";

const Desktop = () => {
  const dispatch = useAppDispatch();

  // Typewriter animation state
  const [headerText, setHeaderText] = useState("");
  const [subtitleText, setSubtitleText] = useState("");
  const [showHeaderCursor, setShowHeaderCursor] = useState(true);
  const [showSubtitleCursor, setShowSubtitleCursor] = useState(false);

  const fullHeaderText = "hello world, this is myke";
  const fullSubtitleText = "welcome to my portfolio";

  // Typewriter effect
  useEffect(() => {
    let headerIndex = 0;
    let subtitleIndex = 0;
    let headerTimeout;
    let subtitleTimeout;

    // Type header first
    const typeHeader = () => {
      if (headerIndex < fullHeaderText.length) {
        setHeaderText(fullHeaderText.slice(0, headerIndex + 1));
        headerIndex++;

        // Add pause after "hello world," (at index 13 which is after the comma)
        if (headerIndex === 13) {
          headerTimeout = setTimeout(typeHeader, 800); // 800ms pause
        } else {
          headerTimeout = setTimeout(typeHeader, 80);
        }
      } else {
        // Header complete, hide cursor and start subtitle
        setShowHeaderCursor(false);
        setShowSubtitleCursor(true);
        subtitleTimeout = setTimeout(typeSubtitle, 300);
      }
    };

    const typeSubtitle = () => {
      if (subtitleIndex < fullSubtitleText.length) {
        setSubtitleText(fullSubtitleText.slice(0, subtitleIndex + 1));
        subtitleIndex++;
        subtitleTimeout = setTimeout(typeSubtitle, 80);
      } else {
        // Animation complete, keep cursor blinking
        setShowSubtitleCursor(true);
      }
    };

    // Start the animation
    headerTimeout = setTimeout(typeHeader, 500);

    return () => {
      clearTimeout(headerTimeout);
      clearTimeout(subtitleTimeout);
    };
  }, []);

  // Organize items on the right side of the screen, with About Me centered
  const generatePosition = (item, index, allItems) => {
    const iconWidth = 100;
    const iconHeight = 100; // approximate height including icon + label
    const menuBarHeight = 28;
    const dockHeight = 120; // dock height + margin
    const padding = 30; // Consistent padding for top and sides
    const verticalSpacing = 110; // Space between icons vertically

    // Special position for About Me - centered below the title text
    if (item.type === "about") {
      const titleHeight = 70; // Gap below the title text
      return {
        x: (window.innerWidth - iconWidth) / 2,
        y: (window.innerHeight / 2) + titleHeight,
      };
    }

    // Position other icons on the right side
    const x = window.innerWidth - iconWidth - padding;
    const startY = padding; // Start from padding (desktop container already accounts for menu bar)

    // Calculate adjusted index (excluding About Me from the right column)
    const rightColumnIndex = allItems
      .slice(0, index)
      .filter(i => i.type !== "about").length;

    // Arrange icons vertically from top to bottom
    const y = startY + (rightColumnIndex * verticalSpacing);

    return {
      x: x,
      y: y,
    };
  };

  const desktopItems = useMemo(() => {
    const items = [
      {
        icon: "/icons/folder_icon.png",
        label: "EasyCal",
        type: "project1",
      },
      {
        icon: "/icons/folder_icon.png",
        label: "homi",
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
      initialPosition: generatePosition(item, index, items),
    }));
  }, []);

  const handleDoubleClick = (type) => {
    if (type === "project1") {
      // Open Finder with EasyCal project selected
      dispatch(
        openWindow({
          title: "Finder",
          windowType: "finder",
          content: <FinderContent initialFolder="easycal" />,
          size: { width: 840, height: 490 },
        })
      );
    } else if (type === "project2") {
      // Open Finder with homi project selected
      dispatch(
        openWindow({
          title: "Finder",
          windowType: "finder",
          content: <FinderContent initialFolder="project2" />,
          size: { width: 840, height: 490 },
        })
      );
    } else if (type === "project3") {
      // Open Finder with Project3 selected
      dispatch(
        openWindow({
          title: "Finder",
          windowType: "finder",
          content: <FinderContent initialFolder="project3" />,
          size: { width: 840, height: 490 },
        })
      );
    } else if (type === "certifications") {
      // Open Finder with Certifications folder selected
      dispatch(
        openWindow({
          title: "Finder",
          windowType: "finder",
          content: <FinderContent initialFolder="certifications" />,
          size: { width: 840, height: 490 },
        })
      );
    } else if (type === "about") {
      // Generate a unique group ID for all About Me windows
      const aboutGroupId = `about-${Date.now()}`;

      // Calculate the centered position for the main text window
      const aboutWindowWidth = 550;
      const aboutWindowHeight = 500;
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

  // Render header text with "myke" wrapped in a hoverable span
  const renderHeaderText = () => {
    const mykeIndex = headerText.indexOf("myke");

    if (mykeIndex === -1 || mykeIndex + 4 > headerText.length) {
      // "myke" hasn't been typed yet or is incomplete
      return headerText;
    }

    // Split text to wrap "myke" in a span
    const beforeMyke = headerText.slice(0, mykeIndex);
    const afterMyke = headerText.slice(mykeIndex + 4);

    return (
      <>
        {beforeMyke}
        <span className="myke-hover">myke</span>
        {afterMyke}
      </>
    );
  };

  return (
    <div className="desktop">
      <div className="desktop-background" />

      <div className="desktop-title">
        <h1 className="desktop-title-header">
          {renderHeaderText()}
          {showHeaderCursor && <span className="typewriter-cursor">|</span>}
        </h1>
        <p className="desktop-title-subtitle">
          {subtitleText}
          {showSubtitleCursor && <span className="typewriter-cursor">|</span>}
        </p>
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

      <Dock />
    </div>
  );
};

export default Desktop;
