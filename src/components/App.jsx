import React from 'react';
import './App.css';
import Table from './Table';
import { api } from '../utils/api';
import Button from './Button';
import Preloader from './Preloader';

function App() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isTable, setIsTable] = React.useState(false);
  const visible = 50;


  function handlePreloader() {
    setIsLoading(!isLoading);
  }

  function handleTable() {
    setIsTable(true);
  }

  function sortBy(key) {
    // data
    // console.log(key)
  }
  // показать мало данных
  function showSmallData() {
    handlePreloader();
    console.log(isLoading);
    api.getSmallData()
      .then((data) => {
        setData(data);
        handleTable()
      })
      .catch((err) => {
        return Promise.reject(new Error(`Ошибка: ${err.message}`));
      });
  }

  // показат много данных
  function showBigData() {
    handlePreloader();
    api.getBigData()
      .then((data) => {
        setData(data);
        handleTable()
      })
      .catch((err) => {
        return Promise.reject(new Error(`Ошибка: ${err.message}`));
      });

  }


  return (
    <div className="App">
      <h1>sort table</h1>
      <Button
        title="мало данных"
        show={showSmallData}
      />
      <Button
        title="много данных"
        show={showBigData}

      />
      {isTable ? <Button title="добавить строку" /> : ""}

      <Preloader isOpen={isLoading} />

      {isTable ?
        <Table
          isOpen={isTable}
          data={data}
          sortBy={sortBy}
          load={handlePreloader}
          visible={visible}
        /> : ""}
      {data.length > visible && isTable ? <Button title="предыдущие" /> : ""}
      {data.length > visible && isTable ? <Button title="следующие" /> : ""}

    </div >
  );
}

export default App;
