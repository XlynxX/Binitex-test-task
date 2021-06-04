import { Component, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
import getNameByCode from '../DataManager/CountryCode';
import Settings from '../DataManager/Settings';
import { Redirect } from 'react-router-dom';
import NoDataFound from './NoDataFound';
import Buttons from './NextPreviousButtons';


registerLocale('ru', ru); 
let settings: Settings;

const DatePicker_First = () => {
  const [startDate, setStartDate] = useState(null ? new Date() : settings.getFirstDate());
  
  return (
    <DatePicker 
    dateFormat=" yyyy/MM/dd"
    locale="ru"
    selected={startDate} 
    onChange={(date) => {
      setStartDate(date);
      settings.setFirstDate(new Date(date));
    }
    } />
  );
};

const DatePicker_Second = () => {
  var _date = settings.getRawData()[settings.getRawData().length - 1].dateRep.split('/');
  const [startDate, setStartDate] = useState(null ? new Date() : new Date(_date[2], --_date[1], _date[0]));
  
  return (
    <DatePicker 
    dateFormat=" yyyy/MM/dd"
    locale="ru"
    selected={startDate} 
    onChange={(date) => {
      setStartDate(date);
      settings.setLastDate(new Date(date)); }
    } />
  );
};

class DataTable extends Component {

  constructor(props: any) {
    super(props);
    // redirect to default page if no data received
    if (props.location.state == undefined) {
      this.render = () => {
        return (
            <Redirect to='/'></Redirect>
          );
    };
      this.render();
      return;
    }
    settings = new Settings(JSON.parse(props.location.state.records), this);
  }
  render() {
    const searchByLetter = (string: any) => {
      settings.getRawData().sort(settings.dataProvider.letter_sort(string));
      settings.forceUpdate();
    }

    function renderRows() {
      settings.rowAmount = 0;
      var html: any = [];
      let maxIndex = 20;
      let SortedData: any = settings.getDataProvider().getInRange(settings.getFirstDate(), settings.getLastDate());
      let elementId: any;
      for (elementId in SortedData) {

        if (getNameByCode(elementId) == '') {
          maxIndex++;
          continue;
        }

        settings.rowAmount++;
        html.push(
        <tr className='table-row'>
          <td>{getNameByCode(elementId)}</td>
          <td>{SortedData[elementId].cases}</td>
          <td>{SortedData[elementId].deaths}</td>
          <td>{SortedData[elementId].cases}</td>
          <td>{SortedData[elementId].deaths}</td>
          <td>Нет данных</td>
          <td>Нет данных</td>
        </tr>
        )
      }

      if (html == '') {
        return ''
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
        <div className="d-block">
          <div className="form-outline mb-3 mt-2">
            <input onChange={ (input: any) => {
              //console.log(input.nativeEvent.data);
              searchByLetter(input.nativeEvent.data);
              } } type="search" id="form1" className="form-control d-inline-block me-2" placeholder="Поиск страны..." aria-label="Search"/>
              
          </div>
          <button className='btn btn-outline-primary d-inline-block me-2'>Таблица</button>
          <button className='btn btn-outline-primary d-inline-block me-2'>График</button>
          <button onClick={ () => 
            { 
              settings.setSearchString('');
              settings.setDefaultDates();
              settings.forceUpdate(); 
            } } className='btn btn-outline-primary d-inline-block ms-5'>Сбросить фильтры</button>
          
        </div>
          <table className='table table-striped mt-3'>
            <thead className='table-head table-light'>
              <tr>
                <th>Страна</th>
                <th>Количество случаев</th>
                <th>Количество смертей</th>
                <th>Количество случаев всего</th>
                <th>Количество смертей всего</th>
                <th>Количество случаев на 1&nbsp;000 жителей</th>
                <th>Количество смертей на 1&nbsp;000 жителей</th>
              </tr>
            </thead>
            <tbody>
              { renderRows() }
            </tbody>
          </table>
          { NoDataFound(settings) }
          { Buttons(settings) }
        </div>
        
      </div>
    );
  }
}

export default DataTable;

