import React from 'react';
import './Input.css';

function Input(props) {
  return (
    <input type="text" value={props.value} onChange={(e) => props.set(e.target.value)} placeholder="поиск"></input>
  )
}

export default Input;