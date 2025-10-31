import React from "react";
import "./SpotifyPlaylistContent.css";

const PLAYLIST_ID = "4qFtfjEs4PU6L7sRgn7zNq";

const SpotifyPlaylistContent = () => {
  return (
    <div className="spotify-playlist-content">
      <iframe
        title="Spotify Playlist"
        src={`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator`}
        width="100%"
        height="100%"
        style={{ border: 0, pointerEvents: 'auto' }}
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
};

export default SpotifyPlaylistContent;
