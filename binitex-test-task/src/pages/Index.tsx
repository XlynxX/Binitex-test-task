import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';

const COVID_DATA_URL = 'https://opendata.ecdc.europa.eu/covid19/casedistribution/json/';
const CORS_PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
let processResult: any;
var covidDATA: any = '';
let canContinue: boolean = false;

class MainPages extends Component {

  render() {
    let forceUpdate = () => this.setState({state: this.state});

    let handleClick = (e: any) => {
      if (covidDATA == '') {
        e.preventDefault();
      }

      if (canContinue) {
        return;
      }
      processResult = setResult(true, "Подключение...");
      forceUpdate();

      console.log('Sending http request...')
      var request = new XMLHttpRequest();
      request.open('GET', CORS_PROXY_URL + COVID_DATA_URL, true);
      request.send();
      request.onload = () => 
      { 
        if (request.status === 200) {
          console.log('Status code is OK');
          covidDATA = JSON.parse(request.responseText).records;
          canContinue = true;
          forceUpdate();
          e.target.click();
          return;
        }
      }
      request.onerror = () => {
        console.log('Status code is not OK');
        processResult = setResult(false, "Что-то пошло не так :/");
        forceUpdate();
      }
    }

    function setResult(result: boolean = false, text: string = ''): any {
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
          <Link to={{
          pathname: '/Stats',
          state: {records: JSON.stringify(covidDATA)}
        }} 
          onClick={ handleClick } 
          type="button" 
          className="btn btn-primary">Начать обработку данных</Link>
        </div>
        <div className="container mt-5">{ processResult }</div>
      </div>
    );
  }
}

export default MainPages;
export { covidDATA };