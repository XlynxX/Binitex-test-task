import React, { Component, Props} from 'react';
import { Redirect, RouteProps, useLocation } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
import DataCountry from '../DataManager/Country';
import DataProvider from '../DataManager/DataProvider';


registerLocale('ru', ru);
let covidDATA: any;
const redirect = () => {
  return (
    <Redirect to='/'></Redirect>
  );
}



class TablePage extends Component {

  constructor(props: any) {
    super(props);
    if (props.location.state == undefined) {
      this.render = redirect;
      this.render();
      return;
    }
    covidDATA = JSON.parse(props.location.state.records);

    for (let index = 0; index < covidDATA.length; index++) {
      const element = covidDATA[index];
      //console.log(element)
    }
  }
  render() {
    
    function startdate() {
      return new Date('2019/12/01');
    }

    function renderRows() {
      let dataProvider: DataProvider = new DataProvider(covidDATA);
      //dataProvider.calculate();
      //console.log(dataCountry.associativeArray['ZWE'])
      
      var html: any = [];
      for (let index = 0; index < 9; index++) 
      {
        const element = covidDATA[index];
        //console.log(element)
        html.push(
        <tr className='table-row'>
          <td>{element.countriesAndTerritories}</td>
        </tr>
        )
      }
      return html;
    }

    return (
      <div className='container-xxl'>
        <h2 className='text-center'>Данные по COVID19</h2>
        <div className="container-xxl">
          <div className='d-inline-flex mt-4'>
            <p className="me-3 bold">Период от</p>
            <DatePicker
            dateFormat="yyyy/MM/dd"
            selected={startdate()}
            locale="ru"
            />
            <p className="mx-3 bold">до</p>
            <DatePicker
            dateFormat="yyyy/MM/dd"
            selected={new Date()}
            locale="ru"
            />
          </div>
          <div className="d-block">
            <button className='d-inline-block'>Таблица</button>
            <button className='d-inline-block'>График</button>
          </div>
        </div>
        <table className='table'>
          <thead className='table-head'>
            <tr>
              <th>Страна</th>
              <th>Количество случаев</th>
              <th>Количество смертей</th>
              <th>Количество случаев всего</th>
              <th>Количество смертей всего</th>
              <th>Количество случаев на 1000 жителей</th>
              <th>Количество смертей на 1000 жителей</th>
            </tr>
          </thead>
          <tbody>
            { renderRows() }
          </tbody>
          <tfoot className="table-foot">
            <button className='text-align-right d-inline-block'>Таблица</button>
            <button className='text-align-right d-inline-block'>График</button>
          </tfoot>
        </table>
      </div>
    );
  }
}

export default TablePage;