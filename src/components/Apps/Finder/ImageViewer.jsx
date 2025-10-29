import React from "react";
import "./ImageViewer.css";

const ImageViewer = ({ imagePath }) => {
  return (
    <div className="image-viewer">
      <img
        src={imagePath}
        alt={imagePath.split("/").pop()}
        onError={(e) => {
          e.target.style.display = "none";
          e.target.parentElement.innerHTML = "<p>Failed to load image</p>";
        }}
      />
    </div>
  );
};

export default ImageViewer;
