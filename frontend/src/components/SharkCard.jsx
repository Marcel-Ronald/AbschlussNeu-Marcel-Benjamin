import React, { useState } from "react";

const SharkCard = ({ shark }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleImageError = (e) => {
    e.target.src =
      "https://via.placeholder.com/250x150/0077cc/ffffff?text=Shark+Image";
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <>
      <div className="shark-card">
        <img
          src={shark.image}
          alt={shark.name}
          className="shark-image"
          onError={handleImageError}
          onClick={openLightbox}
          style={{ cursor: "pointer" }}
        />
        <h3>{shark.name}</h3>
        <p>{shark.description}</p>
      </div>

      {isLightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="lightbox-close" onClick={closeLightbox}>
              ✕
            </button>
            <img
              src={shark.image}
              alt={shark.name}
              className="lightbox-image"
              onError={handleImageError}
            />
            <div className="lightbox-info">
              <h2>{shark.name}</h2>
              <p>{shark.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SharkCard;
