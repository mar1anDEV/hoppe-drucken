import React from 'react';
import HoppeLogo from '../assets/media/logo_300x42.webp'; 

const Loader = () => {
  return (
    <div className="page-wrapper-loader position-absolute top-0 w-100 min-vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <div className="mb-4">
          <img src={HoppeLogo} alt="logo" height="50px" className="ms-3" loading="eager" />
        </div>

        
        <div className="banter-loader" style={{ marginTop: '3.5rem' }}>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
          <div className="banter-loader__box"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;

