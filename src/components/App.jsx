import React from 'react';
import './App.css';
import Table from './Table';
import { api } from '../utils/api';
import Button from './Button';
import Preloader from './Preloader';
import Input from "./Input";
import UserInfo from "./UserInfo";
import Popup from "./Popup";

function App() {
  const [data, setData] = React.useState([]);
  const [isAddRowPopupOpen, setIsAddRowPopupOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isTable, setIsTable] = React.useState(false);
  const [searchingValue, setSearchingValue] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [linesPerPage, setLinesPerPage] = React.useState(50);
  const [count, setCount] = React.useState(0);
  const [sort, setSort] = React.useState("");
  const [key, setKey] = React.useState("");
  const [rowInfo, setRowInfo] = React.useState();
  const [values, setValues] = React.useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  // получить данные о текущей странице
  const columns = data[0] && Object.keys(data[0]);
  const indexOfLastLine = currentPage * linesPerPage;
  const indexOfFirstLine = indexOfLastLine - linesPerPage;
  const currentLines = data.slice(indexOfFirstLine, indexOfLastLine);

  // отображение направления сортировки в столбце
  function handleSortWay() {
    if (sort === "asc") {
      return String.fromCharCode(8595);
    }
    if (sort === "desc") {
      return String.fromCharCode(8593);
    }
  }

  // использовать таблицу
  function handleTable() {
    setIsTable(true);
  }

  // запись информации о клике по ряду в таблице, для отображение под таблицей
  function handleSelectedRow(row) {
    setRowInfo(row);
  }

  // открыть попап 
  function handleAddRowClick() {
    setIsAddRowPopupOpen(true);
  }

  // запить value из инпутов попапа
  function handlePopupInputs(e) {
    const { name, value } = e;
    console.log(name);
    setValues({
      ...values,
      [name]: value
    });
  }

  // для работы disabled у кнопки формы
  function helper() {
  }

  // закрыть попап
  function closePopup() {
    setIsAddRowPopupOpen(false);
  }

  // добавить данные из попапа в начало таблицы
  function handleButtonSubmit(e) {
    e.preventDefault();
    closePopup()
    setData([
      values, ...data
    ])
    console.log(data);
  }

  // клик по кнопке "предыдущая"
  function previousPage() {
    setCount(count - 1);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  // клик по кнопке "следующая"
  function nextPage() {
    setCount(count + 1);
    if (currentPage >= 1) {
      setCurrentPage(currentPage + 1);
    }
  }

  // сортировка столбцов
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

  // поиск по всей таблице
  function filter(currData) {
    if (searchingValue) {
      currData = data;
    }
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
      {isTable ? <Input
        set={setSearchingValue}
        value={searchingValue}
        needOnChange={true}
        placeholder="Поиск"
        label="false"
      /> : ""}
      <Button
        title="мало данных"
        show={showSmallData}
      />
      <Button
        title="много данных"
        show={showBigData}
      />
      {isTable ? <Button title="добавить строку" show={handleAddRowClick} /> : ""}
      <Popup
        isOpen={isAddRowPopupOpen}
        close={closePopup}
        onSubmit={handleButtonSubmit}
        button_title="Добавить строку"
        input_id={
          <Input
            placeholder="id"
            type="number"
            pattern={"^[1-9]{1}[0-9]{0,4}"}
            set={handlePopupInputs}
          />}
        input_firstName={
          <Input
            set={handlePopupInputs}
            placeholder="firstName"
            pattern={"[A-Za-z]{2,20}"}
          />
        }
        input_lastName={
          <Input
            set={handlePopupInputs}
            placeholder="lastName"
            pattern={"[A-Za-z]{2,20}"}
          />
        }
        input_email={
          <Input
            set={handlePopupInputs}
            placeholder="email"
            pattern={"^([a-zA-Z0-9]+[-_.]*[a-zA-Z0-9]+|[a-zA-Z0-9]+)@[-a-zA-Z0-9]+[.][a-zA-Z.]{2,}$"}
          />
        }
        input_phone={
          <Input
            set={handlePopupInputs}
            placeholder="phone"
            pattern="^[(][\d]{3}[)][\d]{3}[\-][\d]{4}"
          />
        }
        button={
          <Button
            type="submit"
            title="Добавить строку"
            disabled={helper}
            show={handleButtonSubmit}
          />
        }
      />
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
