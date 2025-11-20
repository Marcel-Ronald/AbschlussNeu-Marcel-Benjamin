import React from "react";

const SharkCard = ({ shark }) => {
  return (
    <div className="shark-card">
      <img src={shark.image} alt={shark.name} className="shark-image"/>
      <h3>{shark.name}</h3>
      <p>{shark.description}</p>
    </div>
  );
};

export default SharkCard;
