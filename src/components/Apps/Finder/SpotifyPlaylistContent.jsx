import React, { useState, useEffect, useRef } from "react";
import "./SpotifyPlaylistContent.css";

const PLAYLIST_ID = "4qFtfjEs4PU6L7sRgn7zNq";
const PLAYLIST_URL = `https://open.spotify.com/playlist/${PLAYLIST_ID}`;

const SpotifyPlaylistContent = () => {
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTrackId, setCurrentTrackId] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const embedRef = useRef(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        // Try to use Spotify Web API
        const { getPlaylist } = await import("../../../services/spotifyApi");
        const playlistData = await getPlaylist(PLAYLIST_ID);
        setPlaylist(playlistData);
        // Set first track as default playing track
        if (playlistData?.tracks?.items?.[0]?.track?.id) {
          setCurrentTrackId(playlistData.tracks.items[0].track.id);
          setCurrentTrackIndex(0);
        }
      } catch (apiError) {
        console.warn("Spotify API not available, using fallback:", apiError);
        // Fallback: Just show the playlist link and embed info
        setError(
          "Spotify API credentials not configured. Click the link below to view the playlist."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, []);

  // Format time helper (used in multiple places)
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Load Spotify Embed Widget script
  useEffect(() => {
    if (!iframeRef.current || !playlist) return;

    // Prevent multiple initializations
    if (embedRef.current) {
      return;
    }

    let isInitialized = false;

    // Setup the global handler (only once)
    if (!globalThis.onSpotifyIframeApiReady) {
      globalThis.onSpotifyIframeApiReady = (IFrameAPI) => {
        if (isInitialized || !iframeRef.current || embedRef.current) {
          return;
        }

        try {
          // Wait a bit for iframe to be fully ready
          setTimeout(() => {
            if (!iframeRef.current || embedRef.current) return;

            try {
              const embedController = IFrameAPI.createController(
                iframeRef.current,
                {
                  getOAuthToken: (cb) => {
                    cb(null);
                  },
                  name: "My Portfolio Player",
                }
              );

              embedRef.current = embedController;
              isInitialized = true;

              embedController.addListener("ready", ({ device_id }) => {
                console.log("Spotify Embed Ready", device_id);
              });

              embedController.addListener("playback_update", (e) => {
                setIsPlaying(e.data.is_playing);
                setCurrentTime(e.data.position || 0);
                setDuration(e.data.duration || 0);

                // Update current track from playback state
                if (e.data.track_window?.current_track?.id) {
                  const playingTrackId = e.data.track_window.current_track.id;
                  const trackIndex = playlist.tracks?.items?.findIndex(
                    (item) => item.track?.id === playingTrackId
                  );
                  if (trackIndex !== -1 && trackIndex !== undefined) {
                    setCurrentTrackId(playingTrackId);
                    setCurrentTrackIndex(trackIndex);
                  }
                }
              });

              embedController.addListener(
                "initialization_error",
                ({ message }) => {
                  console.error("Spotify Embed Init Error:", message);
                }
              );

              embedController.addListener(
                "authentication_error",
                ({ message }) => {
                  console.error("Spotify Embed Auth Error:", message);
                }
              );
            } catch (err) {
              console.error("Error creating Spotify embed controller:", err);
            }
          }, 1000);
        } catch (err) {
          console.error("Error in onSpotifyIframeApiReady:", err);
        }
      };
    }

    // Load the script if not already loaded
    if (
      !globalThis.Spotify &&
      !document.querySelector('script[src*="spotify.com/embed/iframe-api"]')
    ) {
      const script = document.createElement("script");
      script.src = "https://open.spotify.com/embed/iframe-api/v1";
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      // Don't destroy on unmount to prevent re-initialization issues
    };
  }, [playlist]);

  // Handle play button click - toggle play/pause or start playlist
  const handlePlayButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (embedRef.current) {
      try {
        if (isPlaying) {
          console.log("Pausing playback");
          embedRef.current.pause();
        } else {
          console.log("Resuming playback");
          // If no track is loaded, load the first/current track first
          if (!currentTrackId && playlist?.tracks?.items?.[0]?.track?.id) {
            const firstTrack = playlist.tracks.items[0].track;
            embedRef.current
              .loadUri(`spotify:track:${firstTrack.id}`)
              .then(() => {
                setTimeout(() => {
                  if (embedRef.current) {
                    embedRef.current.resume();
                  }
                }, 300);
              });
          } else if (currentTrackId) {
            embedRef.current.resume();
          } else {
            console.warn("No track to play");
          }
        }
      } catch (err) {
        console.error("Error toggling play:", err);
      }
    } else {
      console.warn("Embed controller not ready");
    }
  };

  // Handle previous/next buttons
  const handlePreviousTrack = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (embedRef.current && currentTrackIndex > 0) {
      try {
        embedRef.current.previousTrack();
        const newIndex = currentTrackIndex - 1;
        const track = playlist?.tracks?.items?.[newIndex]?.track;
        if (track?.id) {
          setCurrentTrackIndex(newIndex);
          setCurrentTrackId(track.id);
        }
      } catch (err) {
        console.error("Error going to previous track:", err);
      }
    }
  };

  const handleNextTrack = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (
      embedRef.current &&
      currentTrackIndex < (playlist?.tracks?.items?.length || 0) - 1 &&
      playlist?.tracks?.items?.length > 0
    ) {
      try {
        embedRef.current.nextTrack();
        const newIndex = currentTrackIndex + 1;
        const track = playlist.tracks.items[newIndex]?.track;
        if (track?.id) {
          setCurrentTrackIndex(newIndex);
          setCurrentTrackId(track.id);
        }
      } catch (err) {
        console.error("Error going to next track:", err);
      }
    }
  };

  // Handle save button - link to playlist on Spotify
  const handleSaveButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(PLAYLIST_URL, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <div className="spotify-playlist-content">
        <div className="spotify-loading">
          <p>Loading playlist...</p>
        </div>
      </div>
    );
  }

  if (error || !playlist) {
    return (
      <div className="spotify-playlist-content">
        <div className="spotify-error">
          <p>{error || "Unable to load playlist data"}</p>
          <a
            href={PLAYLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="spotify-link-button"
          >
            Open Playlist on Spotify
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      className="spotify-playlist-content"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* Top Section - Fixed */}
      <div className="spotify-top-section">
        <div className="spotify-header-top">
          <div className="spotify-logo-container">
            <svg
              viewBox="0 0 24 24"
              className="spotify-logo-icon"
              fill="currentColor"
            >
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.299.24-.54.54-.66 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.242 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
          </div>
        </div>

        <div className="spotify-playlist-header">
          {playlist.images && playlist.images.length > 0 && (
            <img
              src={playlist.images[0].url}
              alt={playlist.name}
              className="playlist-cover"
            />
          )}
          <div className="playlist-info">
            <h1 className="playlist-name">{playlist.name}</h1>
            {playlist.owner && (
              <p className="playlist-owner">{playlist.owner.display_name}</p>
            )}
            <div className="playlist-actions">
              <button className="save-button" onClick={handleSaveButtonClick}>
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="plus-icon"
                >
                  <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                </svg>
                Save on Spotify
              </button>
              <button className="play-button" onClick={handlePlayButtonClick}>
                {isPlaying ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="pause-icon"
                  >
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="play-icon"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="playback-controls">
          <button
            className="control-button previous-button"
            onClick={handlePreviousTrack}
            disabled={currentTrackIndex === 0}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{
                  width:
                    duration > 0 ? `${(currentTime / duration) * 100}%` : "0%",
                }}
              ></div>
            </div>
          </div>
          <button
            className="control-button next-button"
            onClick={handleNextTrack}
            disabled={
              !playlist?.tracks?.items ||
              currentTrackIndex >= playlist.tracks.items.length - 1
            }
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
          <span className="time-remaining">
            {duration > 0 ? `-${formatTime(duration - currentTime)}` : "-00:00"}
          </span>
          <button
            className="control-button more-button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(PLAYLIST_URL, "_blank", "noopener,noreferrer");
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="6" cy="12" r="1.5" />
              <circle cx="18" cy="12" r="1.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hidden Spotify Embed - Must be visible but positioned off-screen for API to work */}
      <iframe
        ref={iframeRef}
        title="Spotify Embed Player"
        src={`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=0`}
        className="spotify-embed-iframe"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      ></iframe>

      {/* Bottom Section - Scrollable */}
      <div className="spotify-tracks-container">
        <div className="tracks-list">
          {playlist.tracks?.items?.map((item, index) => {
            const track = item.track;
            if (!track) return null;

            const isCurrentlyPlaying = currentTrackId === track.id;

            const handleTrackClick = (e) => {
              e.preventDefault();
              e.stopPropagation();

              // Update current track state
              setCurrentTrackId(track.id);
              setCurrentTrackIndex(index);

              // If embed is ready, load and play the track
              if (embedRef.current) {
                try {
                  console.log("Loading track:", track.id);
                  embedRef.current
                    .loadUri(`spotify:track:${track.id}`)
                    .then(() => {
                      console.log("Track loaded, attempting to play...");
                      // Use resume() instead of play() as it's the correct API method
                      setTimeout(() => {
                        if (embedRef.current) {
                          embedRef.current.resume();
                        }
                      }, 500);
                    })
                    .catch((err) => {
                      console.error("Error loading/playing track:", err);
                    });
                } catch (err) {
                  console.error("Error playing track:", err);
                }
              } else {
                console.warn("Embed controller not ready yet");
              }
            };

            return (
              <button
                key={track.id || index}
                className={`track-item ${isCurrentlyPlaying ? "playing" : ""}`}
                onClick={handleTrackClick}
                aria-label={`Play ${track.name} by ${
                  track.artists?.map((artist) => artist.name).join(", ") ||
                  "Unknown Artist"
                }`}
              >
                {isCurrentlyPlaying ? (
                  <div className="track-play-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                ) : (
                  <div className="track-number">{index + 1}</div>
                )}
                <div className="track-info">
                  <p className="track-name">
                    {track.name}
                    {track.explicit && <span className="explicit-tag">E</span>}
                  </p>
                  <p className="track-artist">
                    {track.artists?.map((artist) => artist.name).join(", ") ||
                      "Unknown Artist"}
                  </p>
                </div>
                <div className="track-duration">
                  {formatTime(track.duration_ms || 0)}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SpotifyPlaylistContent;
