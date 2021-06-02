import CountryCodeDictionary from "./CountryCode";

class DataCountry {
    DATA: any;
    Number: number = 0;
    associativeArray = {};
    
    constructor(JSON: any) {
        this.DATA = JSON;
    }

    calculate() {
        for (let index = 0; index < this.DATA.length; index++) {
            const element = this.DATA[index];
            this.associativeArray[this.DATA[index].countryterritoryCode] = this.associativeArray[this.DATA[index].countryterritoryCode] ? (this.associativeArray[this.DATA[index].countryterritoryCode] + 1) : 1;
        }
        //console.log(this.associativeArray)
    }

    test() {
        var associativeArray = {};
        associativeArray["one"] = 1;
        associativeArray["two"] = 2;
        associativeArray["three"] = 3;

        associativeArray['ones'] = associativeArray['ones'] ? (associativeArray['ones'] + 1) : 1
        associativeArray['ones'] = associativeArray['ones'] ? (associativeArray['ones'] + 1) : 1
        associativeArray['ones'] = associativeArray['ones'] ? (associativeArray['ones'] + 1) : 1
        console.log(associativeArray['ones'])
    }
}

export default DataCountry