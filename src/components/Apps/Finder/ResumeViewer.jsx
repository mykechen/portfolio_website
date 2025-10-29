import React, { useEffect } from "react";
import "./ResumeViewer.css";

const ResumeViewer = ({ filePath }) => {
  useEffect(() => {
    // Open PDF in a new tab - will open in browser's default PDF viewer or Adobe if available
    window.open(filePath, "_blank");
  }, [filePath]);

  return (
    <div className="resume-viewer">
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p>Opening resume in new tab...</p>
      </div>
    </div>
  );
};

export default ResumeViewer;
