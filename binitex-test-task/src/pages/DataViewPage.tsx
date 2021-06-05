import { Component, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
import Settings from '../dataManager/Settings';
import { Redirect } from 'react-router-dom';
import NoDataFound from './NoDataFound';
import Buttons from './NextPreviousButtons';
import DaTable from './Table';


registerLocale('ru', ru);
let settings: Settings;
let Table: any;

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

class DataViewPage extends Component {

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
    Table = new DaTable(settings);
  }
  render() {
    const searchByLetter = (string: any) => {
      settings.setSearchString(string);
      settings.forceUpdate();
    }

    const handleResetClick = (e) => {
      console.log(e)
      settings.clearSearch();
      settings.setDefaultDates();
      settings.forceUpdate();
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
            <input onChange={ (value: any) => {
              searchByLetter(value.target.value);
              } } type="search" id="form1" className="form-control d-inline-block me-2" placeholder="Поиск страны..." aria-label="Search"/>

          </div>
          <button className='btn btn-outline-primary d-inline-block me-2'>Таблица</button>
          <button className='btn btn-outline-primary d-inline-block me-2'>График</button>
          <button onClick={ handleResetClick } className='btn btn-primary d-inline-block ms-5'>Сбросить фильтры</button>

        </div>
          { Table.render() }
          { NoDataFound(settings) }
          { Buttons(settings) }
        </div>

      </div>
    );
  }
}

export default DataViewPage;
