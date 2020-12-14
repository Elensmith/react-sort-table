import React from 'react';
import './Table.css';
import Button from './Button';

function Table(props) {

  return (
    <div className={`table ${props.isOpen ? "table_on" : ""}`}>
      <table >
        <thead>
          <tr className="table__title">
            <th >
              <Button
                title="id"
                sortWay={props.keyNow === "id" ? props.sortWay : null}
                className="button_table-style"
                show={() => props.sortBy("id")} />
            </th>
            <th>
              <Button
                title="firstName"
                sortWay={props.keyNow === "firstName" ? props.sortWay : null}
                className="button_table-style"
                show={() => props.sortBy("firstName")} />
            </th>
            <th>
              <Button
                title="lastName"
                sortWay={props.keyNow === "lastName" ? props.sortWay : null}
                className="button_table-style"
                show={() => props.sortBy("lastName")} />
            </th>
            <th>
              <Button
                title="email"
                sortWay={props.keyNow === "email" ? props.sortWay : null}
                className="button_table-style"
                show={() => props.sortBy("email")} />
            </th>
            <th>
              <Button
                title="phone"
                sortWay={props.keyNow === "phone" ? props.sortWay : null}
                className="button_table-style"
                show={() => props.sortBy("phone")} />
            </th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((row, i) => (
            <tr key={i} onClick={() => props.selectedRowInfo(row)}>
              <td>{row.id}</td>
              <td>{row.firstName}</td>
              <td>{row.lastName}</td>
              <td>{row.email}</td>
              <td>{row.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table;