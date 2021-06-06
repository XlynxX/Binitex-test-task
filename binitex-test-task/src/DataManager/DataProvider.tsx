import ALPHABET_RU from "./Alphabet";
import getNameByCode from "./CountryCode";
import MergedData from "./MergedData";

class DataProvider {
    rawData: any;
    Number: number = 0;
    casesArray: any = {};
    deathsArray: any = {};
    keyword: any = null;
    
    constructor(JSON: any) {
        this.rawData = JSON;
        this.getAll();
        this.rawData.sort(this.date_sort);
    }

    getrawData() {
        return this.rawData;
    }

    getMinMaxInRange(date1: Date, date2: Date) {
        let first;
        let last;

        if (date1.getTime() > date2.getTime() || date2.getTime() < date1.getTime()) {
            return '';
        }

        // to get index of the first element that in the date range
        for (let index = 0; index <= this.rawData.length - 1; index++) {
            let elDate = new Date(`${this.rawData[index].year}/${this.rawData[index].month}/${this.rawData[index].day}`);
            if (elDate >= date1) {
                first = index;
                break;
            }
            
        }
        // to get index of the first element that in the date range
        for (let index = this.rawData.length - 1; index >= 0; index--) {
            let elDate = new Date(`${this.rawData[index].year}/${this.rawData[index].month}/${this.rawData[index].day}`);
            if (elDate <= date2) {
                last = index;
                break;
            }
            
        }
        return [first, last];
    }

    getDataInRange(date1: Date, date2: Date, search_string: any = null) {
        let DataArray: any = {};
        let minMax: any = this.getMinMaxInRange(date1, date2);

        for (let index = minMax[0]; index <= minMax[1]; index++) {

            if (DataArray[this.rawData[index].geoId] !== undefined) {
                DataArray[this.rawData[index].geoId] = new MergedData(
                    this.rawData[index].geoId, 
                    this.rawData[index].cases + DataArray[this.rawData[index].geoId].cases, 
                    this.rawData[index].deaths + DataArray[this.rawData[index].geoId].deaths
                    )
                continue;
                
            }
            else {
                DataArray[this.rawData[index].geoId] = 
                new MergedData(
                    this.rawData[index].geoId, 
                    this.rawData[index].cases, 
                    this.rawData[index].deaths
                    )
                continue;
            }
        }
        
        // converting {} to [] to use .sort() function
        DataArray = this.convert(DataArray);
        
        if (search_string != '' && search_string != null && search_string != undefined) {
            this.keyword = search_string;
            let result = DataArray.filter( (data) => { return getNameByCode(data.geoId).toLowerCase().includes(this.keyword.toLowerCase()) } )
            console.log('filtered by the keyword')
            return result;
        }
        console.log('sorted by alphabet')
        return this.alphabet_sort(DataArray);
    }

    getChartStats(date1: Date, date2: Date) {
        let minMax: any = this.getMinMaxInRange(date1, date2);
        let DataArray: any = {};

        for (let index = minMax[0]; index <= minMax[1]; index++) {

            //console.log(this.rawData[index].year)
            // if is not empty and year is the same
            if (DataArray[this.rawData[index].month + this.rawData[index].year] !== undefined) {
                    
                DataArray[this.rawData[index].month + this.rawData[index].year] = { 
                    year: this.rawData[index].year,
                    month: this.rawData[index].month,
                    cases: this.rawData[index].cases + DataArray[this.rawData[index].month + this.rawData[index].year].cases,
                    deaths: this.rawData[index].deaths + DataArray[this.rawData[index].month + this.rawData[index].year].deaths
                }
                continue;   
            }
            else {
                DataArray[this.rawData[index].month + this.rawData[index].year] = { 
                    year: this.rawData[index].year,
                    month: this.rawData[index].month,
                    cases: this.rawData[index].cases,
                    deaths: this.rawData[index].deaths
                }
                continue;
            }
        }

        DataArray = this.convert(DataArray);
        DataArray.sort(function(a, b) {
            return (a.year + a.month) - (b.year + b.month)
        })

        return DataArray;
        
        /*
        var months;
        months = (date2.getFullYear() - date1.getFullYear()) * 12;
        months -= date1.getMonth();
        months += date2.getMonth();
        return months <= 0 ? 0 : months;
        */

    }

    async getAll() {
        this._getAllCases();
        this._getAllDeaths();
    }

    _getAllCases() {
        for (let index = 0; index <= this.rawData.length - 1; index++) {
            this.casesArray[this.rawData[index].geoId] = 
                this.casesArray[this.rawData[index].geoId] ? this.casesArray[this.rawData[index].geoId] + this.rawData[index].cases 
                    : this.rawData[index].cases;
        }
    }

    _getAllDeaths() {
        for (let index = 0; index <= this.rawData.length - 1; index++) {
            this.deathsArray[this.rawData[index].geoId] = 
                this.deathsArray[this.rawData[index].geoId] ? this.deathsArray[this.rawData[index].geoId] + this.rawData[index].deaths
                    : this.rawData[index].deaths;
        }
    }

    getDeathsArr() {
        return this.deathsArray;
    }

    getCasesArr() {
        return this.casesArray;
    }

    date_sort(a, b) {
        var date_a = a.dateRep.split('/');
        var date_b = b.dateRep.split('/');
        return new Date(date_a[2], --date_a[1], date_a[0]).getTime() - new Date(date_b[2], --date_b[1], date_b[0]).getTime();
    }

    alphabet_sort(data: any) {
        
        data.sort(function(a, b) {
            let word_a = getNameByCode(a.geoId).replace(/\s+/g, '');
            let word_b = getNameByCode(b.geoId).replace(/\s+/g, '');

            return ALPHABET_RU.indexOf(word_a.charAt(0).toUpperCase()) - ALPHABET_RU.indexOf(word_b.charAt(0).toUpperCase());
        })

        return data;
      }

    keyWordFilter(data) {
        console.log('key: ' + this.keyword)
        return getNameByCode(data.geoId).toLowerCase().includes(this.keyword.toLowerCase())
    }
    
    convert(DataArray) {
    let elementId: any;
    let sorted: any = [];
    for (elementId in DataArray) {
        sorted.push(DataArray[elementId])
    }
    return sorted;
    }
}

export default DataProvider