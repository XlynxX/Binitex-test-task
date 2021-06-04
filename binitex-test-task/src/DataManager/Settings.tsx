import { Redirect } from "react-router-dom";
import DataTable from "../pages/DataTable";
import DataProvider from "./DataProvider";

export default class Settings {
    dataTable: DataTable;
    rawData: any;
    firstDate: Date = new Date();
    lastDate: Date = new Date();
    dataProvider: DataProvider;
    search: any = '';
    currentPage: number = 1;
    rowAmount: number = 0;
    forceUpdate: any = () => {
        this.dataTable.setState({state: this.dataTable.state})
    }

    constructor(rawData: any, dataTable: DataTable) {
        this.rawData = rawData;
        this.dataProvider = new DataProvider(rawData);
        this.dataTable = dataTable;
        this.setDefaultDates();
    }

    getRawData() { return this.dataProvider.getrawData(); }
    getFirstDate() { return this.firstDate; }
    getLastDate() { return this.lastDate; }
    getDataProvider() { return this.dataProvider; }
    getSearchString() { return this.search; }

    setRawData(rawData: any) { this.rawData = rawData; }
    setFirstDate(FirstDate: Date) 
    { 
        this.firstDate = FirstDate;
        this.forceUpdate();
    }
    setLastDate(LastDate: Date) 
    { 
        this.lastDate = LastDate;
        this.forceUpdate();
    }
    setSearchString(SearchString: any) { this.search = SearchString; }
    
    setDefaultDates() {
        var date_start = this.rawData[0].dateRep.split('/');
        this.firstDate = new Date(date_start[2], --date_start[1], date_start[0]);
        var date_end = this.rawData[this.rawData.length - 1].dateRep.split('/');
        this.lastDate = new Date(date_end[2], --date_end[1], date_end[0]);
    }
}