import React from 'react';
import './App.css';
import Table from './Table';
import { api } from "../utils/api";

function App() {
  // получить все карточки
  React.useEffect(() => {
    api.getSmallData()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log('Ошибка. Запрос не выполнен: ', err);
      });
  }, []);
  return (
    <div className="App">
      <h1>sort table</h1>
      <Table />
    </div>
  );
}

export default App;
