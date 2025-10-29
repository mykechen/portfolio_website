// Spotify Web API service
// To use this, you need to:
// 1. Create a Spotify app at https://developer.spotify.com/dashboard
// 2. Get your Client ID and Client Secret
// 3. Add them to a .env file as VITE_SPOTIFY_CLIENT_ID and VITE_SPOTIFY_CLIENT_SECRET

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";

// Get access token using Client Credentials flow
async function getAccessToken() {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "Spotify API credentials not found. Please add VITE_SPOTIFY_CLIENT_ID and VITE_SPOTIFY_CLIENT_SECRET to your .env file"
    );
  }

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(clientId + ":" + clientSecret)}`,
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error("Failed to get Spotify access token");
  }

  const data = await response.json();
  return data.access_token;
}

// Get playlist data with all tracks
export async function getPlaylist(playlistId) {
  try {
    const token = await getAccessToken();

    // Fetch playlist with tracks (limit to 100 per request, but we'll get first page)
    let url = `${SPOTIFY_API_BASE}/playlists/${playlistId}?market=US`;
    const allTracks = [];
    let hasMore = true;
    let offset = 0;
    const limit = 50;

    // First, get the playlist info
    const playlistResponse = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!playlistResponse.ok) {
      throw new Error("Failed to fetch playlist");
    }

    const playlist = await playlistResponse.json();

    // Fetch all tracks if pagination is needed
    while (hasMore) {
      const tracksUrl = `${SPOTIFY_API_BASE}/playlists/${playlistId}/tracks?market=US&limit=${limit}&offset=${offset}`;
      const tracksResponse = await fetch(tracksUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!tracksResponse.ok) {
        break; // Stop if we can't fetch more tracks
      }

      const tracksData = await tracksResponse.json();
      allTracks.push(...tracksData.items);

      hasMore = tracksData.next !== null;
      offset += limit;
    }

    // Replace the tracks with all fetched tracks
    playlist.tracks = {
      ...playlist.tracks,
      items: allTracks,
      total: allTracks.length,
    };

    return playlist;
  } catch (error) {
    console.error("Error fetching playlist:", error);
    throw error;
  }
}
