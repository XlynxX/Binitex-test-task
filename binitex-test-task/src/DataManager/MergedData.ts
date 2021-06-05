export default class MergedData {
    geoId: number = 0;
    cases: number = 0;
    deaths: number = 0;
    //date: Date;
    
    constructor(geoId, cases, deaths) {
        this.geoId = geoId;
        this.cases = cases;
        this.deaths = deaths;
        //this.date = date;
    }
}