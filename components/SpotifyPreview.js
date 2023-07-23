"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import H5AudioPlayer from "react-h5-audio-player";

function SpotifyPreview({ trackId, token }) {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.spotify.com/v1/tracks/${trackId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPreviewUrl(response.data.preview_url);
      })
      .catch((error) => console.error(error));
  }, [trackId, token]);

  return (
    previewUrl && (
      <H5AudioPlayer
        autoPlay
        src={previewUrl}
        onPlay={(e) => {
          setTimeout(() => {
            e.target.pause();
          }, 5000);
        }}
      />
    )
  );
}

export default SpotifyPreview;
