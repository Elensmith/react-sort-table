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
  const [q, setQ] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [linesPerPage, setLinesPerPage] = React.useState(50);
  const columns = data[0] && Object.keys(data[0]);

  // получить данные о текущей странице
  const indexOfLastLine = currentPage * linesPerPage;
  const indexOfFirstLine = indexOfLastLine - linesPerPage;
  const currentLines = data.slice(indexOfFirstLine, indexOfLastLine);

  function previousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage >= 1) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePreloader() {
    setIsLoading(!isLoading);
  }

  function handleTable() {
    setIsTable(true);
  }

  function sortBy(key) {
    // const oldData = data;
    const newData = data.sort((a, b) => a[key] - b[key]);
    setData(newData);
    console.log(newData);
  }


  function filter(data) {
    return data.filter((row) =>
      columns.some(
        (column) => row[column].toString().toLowerCase().indexOf(q) > -1)
    )
  }
  // показать мало данных
  function showSmallData() {
    handlePreloader();
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
      {isTable ? <Input set={setQ} value={q} /> : ""}

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
          data={filter(currentLines)}
          // data={filter(data)}
          sortBy={sortBy}
          load={handlePreloader}
          visible={linesPerPage}
          set={data}
        /> : ""}
      {data.length > linesPerPage && isTable ? <Button title="предыдущие" show={previousPage} /> : ""}
      {data.length > linesPerPage && isTable ? <Button title="следующие" show={nextPage} /> : ""}

    </div >
  );
}

export default App;
