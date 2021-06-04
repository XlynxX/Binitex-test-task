export default class MergedData {
    geoId: any;
    cases: any;
    deaths: any;
    
    constructor(geoId, cases, deaths) {
        this.geoId = geoId;
        this.cases = cases;
        this.deaths = deaths;
    }
}