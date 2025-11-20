import React from "react";

const SharkCard = ({ shark }) => {
  const handleImageError = (e) => {
    e.target.src =
      "https://via.placeholder.com/250x150/0077cc/ffffff?text=Shark+Image";
  };

  return (
    <div className="shark-card">
      <img
        src={shark.image}
        alt={shark.name}
        className="shark-image"
        onError={handleImageError}
      />
      <h3>{shark.name}</h3>
      <p>{shark.description}</p>
    </div>
  );
};

export default SharkCard;
