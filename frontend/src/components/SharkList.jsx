import React from "react";
import SharkCard from "./SharkCard";

const SharkList = ({ sharks }) => {
  return (
    <div className="shark-list">
      {sharks.map((shark) => (
        <SharkCard key={shark.id} shark={shark} />
      ))}
    </div>
  );
};

export default SharkList;
