import React from 'react';
import './Input.css';
import './Popup.css';

function Input(props) {
  return (
    <div className="input">
      {!props.label ? <label className="input__label">{props.placeholder}</label> : null}
      <input type={props.type ? props.type : "text"}
        value={props.value}
        onChange={(e) => props.set(e.target)}
        placeholder={props.placeholder}
        required
        pattern={props.pattern}
        name={props.placeholder}>
      </input>
    </div>
  )
}

export default Input;