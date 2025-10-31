import React from "react";
import "./SpotifyPlaylistContent.css";

const PLAYLIST_ID = "4qFtfjEs4PU6L7sRgn7zNq";

const SpotifyPlaylistContent = ({
  onClose,
  onMinimize,
  onMaximize,
  isDragging = false,
}) => {
  const handleControlClick = (event, action) => {
    if (!action) return;
    event.stopPropagation();
    action();
  };

  return (
    <div className="spotify-playlist-content">
      <div className="spotify-drag-handle">
        <div className="traffic-lights">
          <button
            className="traffic-light traffic-light-close"
            onClick={(event) => handleControlClick(event, onClose)}
            aria-label="Close"
            type="button"
          />
          <button
            className="traffic-light traffic-light-minimize"
            onClick={(event) => handleControlClick(event, onMinimize)}
            aria-label="Minimize"
            type="button"
          />
          <button
            className="traffic-light traffic-light-maximize"
            onClick={(event) => handleControlClick(event, onMaximize)}
            aria-label="Maximize"
            type="button"
          />
        </div>
        <span className="spotify-drag-title">vibing</span>
      </div>
      <div
        className={`spotify-iframe-wrapper${isDragging ? " dragging" : ""}`}
      >
        <iframe
          title="Spotify Playlist"
          src={`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator`}
          width="100%"
          height="100%"
          style={{ border: 0, pointerEvents: isDragging ? "none" : "auto" }}
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default SpotifyPlaylistContent;
