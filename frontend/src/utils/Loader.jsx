import React from 'react';
import '../assets/styles/utilscss/Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
      </div>
    </div>
  );
}

export default Loader;