import React from "react";
import SharkCard from "./SharkCard";

const SkeletonCard = () => (
  <div className="shark-card skeleton-card">
    <div className="skeleton skeleton-image"></div>
    <div className="skeleton skeleton-title"></div>
    <div className="skeleton skeleton-text"></div>
    <div className="skeleton skeleton-text short"></div>
  </div>
);

const SharkList = ({ sharks, loading = false }) => {
  if (loading) {
    return (
      <div className="shark-list">
        {[...Array(6)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="shark-list">
      {sharks.map((shark) => (
        <SharkCard key={shark.id} shark={shark} />
      ))}
    </div>
  );
};

export default SharkList;
