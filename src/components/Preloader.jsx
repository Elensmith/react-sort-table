import React from 'react';
import "./Preloader.css";


function Preloader() {
  return (
    <div className="preloader">
      <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Preloader;