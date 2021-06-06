import LineChart from "../components/LineChart";
import TableChart from "../components/TableChart";
import DataViewPage from "../pages/DataViewPage";
import DataProvider from "./DataProvider";

export default class Settings {
    Table: any;
    Line: any;
    dataViewPage: DataViewPage;
    rawData: any;
    firstDate: Date = new Date();
    lastDate: Date = new Date();
    dataProvider: DataProvider;
    search: any = null;
    currentPage: number = 1;
    rowAmount: number = 0;
    // 0 - table, 1 - graph
    currentView: number = 0;
    forceUpdate: any = () => {
        this.dataViewPage.setState({state: this.dataViewPage.state})
    }

    constructor(rawData: any, dataViewPage: DataViewPage) {
        this.rawData = rawData;
        this.dataProvider = new DataProvider(rawData);
        this.Table = new TableChart(this);
        this.Line = new LineChart(this);
        this.dataViewPage = dataViewPage;
        this.setDefaultDates();
    }

    getRawData() { return this.dataProvider.getrawData(); }
    getFirstDate() { return this.firstDate; }
    getLastDate() { return this.lastDate; }
    getDataProvider() { return this.dataProvider; }
    getSearchString() { return this.search; }
    getViewNumber() { return this.currentView; }
    
    getView() {
        // 0 - table, 1 - linechart
        switch (this.currentView) {
        case 0:
        return this.Table.render();
        case 1:
        return this.Line.render();
        default:
        return this.Table.render();
        }
    }

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
    setSearchString(SearchString: any) {
        this.search = SearchString;
    }

    setDefaultDates() {
        var date_start = this.rawData[0].dateRep.split('/');
        this.firstDate = new Date(date_start[2], --date_start[1], date_start[0]);
        var date_end = this.rawData[this.rawData.length - 1].dateRep.split('/');
        this.lastDate = new Date(date_end[2], --date_end[1], date_end[0]);
    }

    clearSearch() {
        this.search = null;
    }

    setView(view: number) {
        this.currentView = view;
        return '';
    }
}
