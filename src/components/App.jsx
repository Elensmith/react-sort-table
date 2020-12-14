import React from 'react';
import './App.css';
import Table from './Table';
import { api } from '../utils/api';
import Button from './Button';
import Preloader from './Preloader';
import Input from "./Input";
import UserInfo from "./UserInfo";

function App() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isTable, setIsTable] = React.useState(false);
  const [searchingValue, setSearchingValue] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [linesPerPage, setLinesPerPage] = React.useState(50);
  const [count, setCount] = React.useState(0);
  const [sort, setSort] = React.useState("");
  const [key, setKey] = React.useState("");
  const [rowInfo, setRowInfo] = React.useState();

  // получить данные о текущей странице

  const columns = data[0] && Object.keys(data[0]);
  const indexOfLastLine = currentPage * linesPerPage;
  const indexOfFirstLine = indexOfLastLine - linesPerPage;
  const currentLines = data.slice(indexOfFirstLine, indexOfLastLine);

  function handleSortWay() {
    if (sort === "asc") {
      return String.fromCharCode(8595);
    }
    if (sort === "desc") {
      return String.fromCharCode(8593);
    }
  }

  function handleSelectedRow(row) {
    setRowInfo(row)
  }

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
    const sortType = sort === "asc" ? setSort("desc") : setSort("asc");
    setKey(key);

    const newData = data.sort((a, b) => {
      if (key === "id") {

        if (sort === "asc") {
          return b[key] - a[key]
        } else {
          return a[key] - b[key]
        }
      }
      else {
        if (sort === "asc") {
          if (a[key].toLowerCase() > b[key].toLowerCase()) {
            return -1;
          }
          if (a[key].toLowerCase() < b[key].toLowerCase()) {
            return 1;
          }
          return 0;
        } else {
          if (a[key].toLowerCase() > b[key].toLowerCase()) {
            return 1;
          }
          if (a[key].toLowerCase() < b[key].toLowerCase()) {
            return -1;
          }
          return 0;
        }
      }
    });
    setData(newData);
  }


  function filter(currData) {
    if (searchingValue) {
      currData = data;
    }
    // e.preventDefault();
    // setCurrentPage(1);
    return currData.filter((row) =>
      columns.some(
        (column) => row[column].toString().toLowerCase().indexOf(searchingValue) > -1)
    )
  }
  // показать мало данных
  function showSmallData() {
    setRowInfo();
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
    setRowInfo();
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
          sortBy={sortBy}
          visible={linesPerPage}
          sortWay={handleSortWay()}
          keyNow={key}
          selectedRowInfo={handleSelectedRow}
        />}
      {rowInfo ? <UserInfo
        firstName={rowInfo.firstName}
        lastName={rowInfo.lastName}
        description={rowInfo.description}
        streetAddress={rowInfo.address.streetAddress}
        city={rowInfo.address.city}
        state={rowInfo.address.state}
        zip={rowInfo.address.zip}
      /> : ""}
      {data.length > linesPerPage && isTable ? <Button title="предыдущие" show={previousPage} disabled={count >= 1 ? false : true} /> : ""}
      {data.length > linesPerPage && isTable ? <Button title="следующие" show={nextPage} disabled={indexOfLastLine === data.length - linesPerPage ? true : false} /> : ""}

    </div >
  );
}

export default App;
