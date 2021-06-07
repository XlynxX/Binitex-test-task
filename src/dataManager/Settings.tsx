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
    filterBy: any = 'caseAmount';
    minFilter: any = null;
    maxFilter: any = null;
    dataProvider: DataProvider;
    search: any = null;
    chartCountrySearch: any = 'all';
    currentPage: number = 1;
    maxPage: number = 0;
    rowAmount: number = 0;
    
    // 0 - table
    // 1 - graph
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
    getSearchCountry() { return this.chartCountrySearch; }
    getFilterMinMax() { return [this.minFilter, this.maxFilter] }
    getFilter() { return this.filterBy; }
    
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
    setMinFilter(num: any) { this.minFilter = num; this.forceUpdate(); }
    setMaxFilter(num: any) { this.maxFilter = num; this.forceUpdate(); }
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

    setSearchCountry(country_geoid: any) {
        this.chartCountrySearch = country_geoid;
        this.forceUpdate();
    }

    setFilterBy(filter_by: any) {
        this.filterBy = filter_by;
        this.forceUpdate();
    }

    setDefaultDates() {
        var date_start = this.rawData[0].dateRep.split('/');
        this.firstDate = new Date(date_start[2], --date_start[1], date_start[0]);
        var date_end = this.rawData[this.rawData.length - 1].dateRep.split('/');
        this.lastDate = new Date(date_end[2], --date_end[1], date_end[0]);
    }

    clearSearch() {
        this.search = null;
        this.minFilter = null;
        this.maxFilter = null;
        this.chartCountrySearch = 'all'
        //this.forceUpdate();
    }

    setView(view: number) {
        this.currentView = view;
        return '';
    }
}
