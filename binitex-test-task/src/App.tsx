import React, { useState } from 'react';
import './App.css';
//import logo from './logo.svg';

const COVID_DATA_URL = 'https://opendata.ecdc.europa.eu/covid19/casedistribution/json/';
const CORS_PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

function useForceUpdate() {
  let [value, setState] = useState(true);
  return () => setState(!value);
}
let processResult: any;

function App() {
  let forceUpdate = useForceUpdate();

  function processData(): void {
    console.log('Sending http request...')
    var request = new XMLHttpRequest();
    request.open('GET', CORS_PROXY_URL + COVID_DATA_URL, true);
    request.send();
    request.onload = () => 
    { 
      if (request.status === 200) {
        processResult = setResult(true, "Подключено!");
        forceUpdate();
        return;
      }
      processResult = setResult(false, "Что-то пошло не так :/");
      forceUpdate();
    }
  }

  function setResult(result: boolean = false, text: string = '') {
    if (result) {
      return <p className="text-center text-success">{ text }</p>;
    }
    if (!result) {
      return <p className="text-center text-danger">{ text }</p>;
    }

    return '';
  }

  return (
    <div>
      <div className="container d-flex align-items-center justify-content-center height">
        <button onClick={ () => { processData();} } type="button" className="btn btn-primary">Начать обработку данных</button>
      </div>
      <div className="container mt-5">{ processResult }</div>
    </div>
  );
}

export default App;
