import { Component, useState } from 'react';
import { Redirect } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
import DataProvider from '../DataManager/DataProvider';
import getNameByCode from '../DataManager/CountryCode';


registerLocale('ru', ru);
let covidDATA: any;
let firstDate: Date;
let lastDate: Date;
let dataProvider: DataProvider;

const redirect = () => {
  return (
    <Redirect to='/'></Redirect>
  );
}

const DatePicker_First = () => {
  var date_start = dataProvider.DATA[0].dateRep.split('/');
  const [startDate, setStartDate] = useState(null ? new Date() : new Date(date_start[2], --date_start[1], date_start[0]));
  
  return (
    <DatePicker 
    dateFormat="yyyy/MM/dd"
    locale="ru"
    selected={startDate} 
    onChange={(date) => {
      setStartDate(date);
      firstDate = date;
    }
    } />
  );
};

const DatePicker_Second = () => {
  var _date = dataProvider.DATA[dataProvider.DATA.length - 1].dateRep.split('/');
  const [startDate, setStartDate] = useState(null ? new Date() : new Date(_date[2], --_date[1], _date[0]));
  
  return (
    <DatePicker 
    dateFormat="yyyy/MM/dd"
    locale="ru"
    selected={startDate} 
    onChange={(date) => {
      setStartDate(date);
      lastDate = date; }
    } />
  );
};

class DataTable extends Component {

  constructor(props: any) {
    super(props);
    if (props.location.state == undefined) {
      this.render = redirect;
      this.render();
      return;
    }
    covidDATA = JSON.parse(props.location.state.records);
    dataProvider = new DataProvider(covidDATA);

    for (let index = 0; index < covidDATA.length; index++) {
      const element = covidDATA[index];
      //console.log(element)
    }
  }
  render() {
    let forceUpdate = () => this.setState({state: this.state});

    function renderRows() {
      dataProvider.test();
      
      var html: any = [];
      for (let index = 0; index < 20; index++) 
      {
        const element = covidDATA[index];
        if (getNameByCode(element.geoId) == '') {
          continue;
        }
        html.push(
        <tr className='table-row'>
          <td>{getNameByCode(element.geoId)}</td>
          <td>{element.cases}</td>
          <td>{element.deaths}</td>
          <td>{element.deaths}</td>
          <td>{element.deaths}</td>
          <td>{element.deaths}</td>
          <td>{element.deaths}</td>
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
            <DatePicker_First/>
            <p className="mx-3 bold">до</p>
            <DatePicker_Second />
          </div>
        </div>
        <div className="container-xxl mb-2">
        <div className="d-block w-100">
        <div className="form-outline mb-3 mt-2">
          <input type="search" id="form1" className="form-control" placeholder="Поиск страны..."
          aria-label="Search" />
        </div>
          <button className='btn btn-outline-primary d-inline-block me-2'>Таблица</button>
          <button className='btn btn-outline-primary d-inline-block'>График</button>
        </div>
          <table className='table table-striped mt-3'>
            <thead className='table-head table-light'>
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
            <tfoot>
              
            </tfoot>
          </table>
          <button className='btn btn-outline-primary d-inline-block me-2'>&laquo; Назад</button>
          <button className='btn btn-outline-primary d-inline-block me-2'>1</button>
          <button className='btn btn-outline-primary d-inline-block me-2'>2</button>
          <button className='btn btn-outline-primary d-inline-block me-2'>3</button>
          <button className='btn btn-outline-primary d-inline-block me-2'>...</button>
          <button className='btn btn-outline-primary d-inline-block'>Следующая &raquo;</button>
        </div>
        
      </div>
    );
  }
}

export default DataTable;
function useMyHook() {
  throw new Error('Function not implemented.');
}

