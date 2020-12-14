import React from 'react';

function UserInfo(props) {
  return (
    <div>
      <p>Выбран пользователь <b>{props.firstName}{ }{props.lastName}</b></p>
      <p>Описание:</p>
      <textarea defaultValue={props.description}></textarea>
      <p>Адрес проживания: <b>{props.streetAddress}</b></p>
      <p>Город: <b>{props.city}</b></p>
      <p>Провинция/штат: {props.state}</p>
      <p>Индекс: <b>{props.zip}</b></p>
    </div>
  )
}
export default UserInfo;