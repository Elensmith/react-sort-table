import React from 'react';
import "./Preloader.css";


function Preloader(props) {
  return (
    <div className="preloader">
      <div className={`lds-spinner ${props.isOpen ? "lds-spinner_on" : ""}`}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Preloader;