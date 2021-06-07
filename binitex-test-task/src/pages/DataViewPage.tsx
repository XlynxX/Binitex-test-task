import React, { Component, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
import Settings from '../dataManager/Settings';
import { Redirect } from 'react-router-dom';
import NoDataFound from '../components/NoDataFound';
import Buttons from '../components/NextPreviousButtons';
import SwitchViewButtons from '../components/SwitchViewButtons';
import Search from '../components/Search';


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
  }
  render() {

    const handleResetClick = (e) => {
      //console.log(e)
      settings.clearSearch();
      settings.currentPage = 1;
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
          { Search(settings) }
          { SwitchViewButtons(settings) }
          <button onClick={ handleResetClick } className='btn btn-primary d-inline-block ms-5'>Сбросить фильтры</button>

        </div>
          { settings.getView() }
          { NoDataFound(settings) }
          { Buttons(settings) }
        </div>
      </div>
    );
  }
}

export default DataViewPage;
