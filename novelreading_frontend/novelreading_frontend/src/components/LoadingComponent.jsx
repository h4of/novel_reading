import React from "react";
import "./LoadingComponent.css";

const LoadingComponent = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="p-loading">Loading...</p>
    </div>
  );
};

export default LoadingComponent;
