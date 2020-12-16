import React from 'react';
import close from "../images/close.svg"

function Popup(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__content">
        <h3>Добавить новую строку</h3>
        <img className="popup__close" src={close} alt="" onClick={props.close} />
        <form className="popup__form" onSubmit={props.onSubmit}>
          <div className="popup__input">{props.input_id}</div>
          <div className="popup__input">{props.input_firstName}</div>
          <div className="popup__input">{props.input_lastName}</div>
          <div className="popup__input">{props.input_email}</div>
          <div className="popup__input">{props.input_phone}</div>
          {props.button}
        </form>
      </div>
    </div>
  )
}

export default Popup;