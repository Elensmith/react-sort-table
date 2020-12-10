import React from 'react';
import './Table.css';
import Button from './Button';

function Table(props) {

  React.useEffect(() => {
    return props.setData
  }, []);

  React.useEffect(() => {

    return props.load();
  }, []);

  return (
    <div className={`table ${props.isOpen ? "table_on" : ""}`}>
      <table >
        <thead>
          <tr className="table__title">
            <th >
              <Button
                title="id"
                className="button_table-style"
                show={() => props.sortBy("id")} />
            </th>
            <th>
              <Button
                title="firstName"
                className="button_table-style"
                show={() => props.sortBy("firstName")} />
            </th>
            <th>
              <Button
                title="lastName"
                className="button_table-style"
                show={() => props.sortBy("lastName")} />
            </th>
            <th>
              <Button
                title="email"
                className="button_table-style"
                show={() => props.sortBy("email")} />
            </th>
            <th>
              <Button
                title="phone"
                className="button_table-style"
                show={() => props.sortBy("phone")} />
            </th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((row, i) => (
            <tr key={i}>
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