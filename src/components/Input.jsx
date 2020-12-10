import React from 'react';
import './Input.css';
// import Button from './Button';

function Input(props) {
  return (
    // <form>
    <input type="text" value={props.value} onChange={(e) => props.set(e.target.value)} placeholder="Поиск"></input>
    /* <Button title="Поиск" show={(e) => props.show(e)} /> */
    // </form>
  )
}

export default Input;