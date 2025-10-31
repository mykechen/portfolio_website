import React, { useState, useMemo, useRef } from "react";
import { BsFileEarmarkImage, BsFiletypeJson } from "react-icons/bs";
import "./TrashContent.css";

const TrashContent = () => {
  // Define files with their icons
  const files = [
    {
      id: 1,
      name: "startup_idea67.doc",
      icon: "/icons/docx_icon.png",
      type: "image",
    },
    {
      id: 2,
      name: "resume_v22_final.pdf",
      icon: "/icons/pdf.png",
      type: "image",
    },
    {
      id: 3,
      name: "golf_scorecard.png",
      icon: <BsFileEarmarkImage />,
      type: "react-icon",
    },
    {
      id: 4,
      name: "travelplan.doc",
      icon: "/icons/docx_icon.png",
      type: "image",
    },
    {
      id: 5,
      name: "sleep_schedule.json",
      icon: <BsFiletypeJson />,
      type: "react-icon",
    },
    {
      id: 6,
      name: "homework3.doc",
      icon: "/icons/docx_icon.png",
      type: "image",
    },
    {
      id: 7,
      name: "final_cheatsheet.pdf",
      icon: "/icons/pdf.png",
      type: "image",
    },
    {
      id: 8,
      name: "random_screenshot_241.png",
      icon: <BsFileEarmarkImage />,
      type: "react-icon",
    },
    {
      id: 9,
      name: "new_years_resolution_2023.txt",
      icon: "/icons/text_file_icon.png",
      type: "image",
    },
  ];

  // Generate initial random positions for each file
  const initialPositions = useMemo(() => {
    return files.reduce((acc, file) => {
      acc[file.id] = {
        x: Math.random() * 70 + 5, // 5% to 75% from left
        y: Math.random() * 70 + 5, // 5% to 75% from top
      };
      return acc;
    }, {});
  }, []);

  const [positions, setPositions] = useState(initialPositions);
  const [dragging, setDragging] = useState(null);
  const dragRef = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0 });

  const handleMouseDown = (e, fileId) => {
    e.preventDefault();
    setDragging(fileId);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: positions[fileId].x,
      initialY: positions[fileId].y,
    };
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;

    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();

    const deltaX = ((e.clientX - dragRef.current.startX) / rect.width) * 100;
    const deltaY = ((e.clientY - dragRef.current.startY) / rect.height) * 100;

    const newX = Math.max(0, Math.min(85, dragRef.current.initialX + deltaX));
    const newY = Math.max(0, Math.min(85, dragRef.current.initialY + deltaY));

    setPositions((prev) => ({
      ...prev,
      [dragging]: { x: newX, y: newY },
    }));
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  return (
    <div
      className="trash-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="trash-files">
        {files.map((file) => (
          <div
            key={file.id}
            className={`trash-file-item ${dragging === file.id ? "dragging" : ""}`}
            style={{
              left: `${positions[file.id].x}%`,
              top: `${positions[file.id].y}%`,
            }}
            onMouseDown={(e) => handleMouseDown(e, file.id)}
          >
            <div className="trash-file-icon">
              {file.type === "image" ? (
                <img src={file.icon} alt={file.name} />
              ) : (
                <div className="trash-file-react-icon">{file.icon}</div>
              )}
            </div>
            <div className="trash-file-name">{file.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashContent;
