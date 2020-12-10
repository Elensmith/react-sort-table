import React from 'react';
import './App.css';
import Table from './Table';
import { api } from '../utils/api';
import Button from './Button';
import Preloader from './Preloader';
import Input from "./Input";

function App() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isTable, setIsTable] = React.useState(false);
  const [searchingValue, setSearchingValue] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [linesPerPage, setLinesPerPage] = React.useState(50);
  const [count, setCount] = React.useState(0);


  // получить данные о текущей странице

  const columns = data[0] && Object.keys(data[0]);
  const indexOfLastLine = currentPage * linesPerPage;
  const indexOfFirstLine = indexOfLastLine - linesPerPage;
  const currentLines = data.slice(indexOfFirstLine, indexOfLastLine);


  function previousPage() {
    setCount(count - 1);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    setCount(count + 1);
    if (currentPage >= 1) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handleTable() {
    setIsTable(true);
  }

  function sortBy(key) {
    // const oldData = data;
    const newData = data.sort((a, b) => a[key] - b[key]);
    setData(newData);
    // console.log(newData);
  }


  function filter(currData) {
    if (searchingValue) {
      currData = data;
    }
    // e.preventDefault();
    // console.log(data);
    // console.log(e);
    // setCurrentPage(1);
    return currData.filter((row) =>
      columns.some(
        (column) => row[column].toString().toLowerCase().indexOf(searchingValue) > -1)

    )
    // setCurrentPage(1);
    // console.log(data);
  }
  // показать мало данных
  function showSmallData() {
    setIsLoading(true);
    api.getSmallData()
      .then((data) => {
        setData(data);
        setIsLoading(false)
        handleTable()
      })
      .catch((err) => {
        return Promise.reject(new Error(`Ошибка: ${err.message}`));
      });
  }

  // показат много данных
  function showBigData() {
    setIsLoading(true);
    api.getBigData()
      .then((data) => {
        setData(data);
        setIsLoading(false)
        handleTable()
      })
      .catch((err) => {
        return Promise.reject(new Error(`Ошибка: ${err.message}`));
      });
  }


  return (
    <div className="App">
      <h1>sort table</h1>
      {isTable ? <Input set={setSearchingValue} value={searchingValue} /> : ""}
      {/* {isTable ? <Input set={setSearchingValue} value={searchingValue} show={filter} /> : ""} */}
      <Button
        title="мало данных"
        show={showSmallData}
      />
      <Button
        title="много данных"
        show={showBigData}

      />

      {isTable ? <Button title="добавить строку" /> : ""}

      {isLoading ? <Preloader /> :
        <Table
          isOpen={isTable}
          data={filter(currentLines)}
          // data={(currentLines)}
          sortBy={sortBy}
          visible={linesPerPage}
        // set={data}
        />}

      {data.length > linesPerPage && isTable ? <Button title="предыдущие" show={previousPage} disabled={count >= 1 ? false : true} /> : ""}
      {data.length > linesPerPage && isTable ? <Button title="следующие" show={nextPage} disabled={indexOfLastLine === data.length - linesPerPage ? true : false} /> : ""}

    </div >
  );
}

export default App;
