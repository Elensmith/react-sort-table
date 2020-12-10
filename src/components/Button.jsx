import React from 'react';
import "./Button.css";

function Button(props) {

  return (
    <button className={`${props.className}`} onClick={props.show} disabled={props.disabled}>{props.title}</button>
  )
}

export default Button;