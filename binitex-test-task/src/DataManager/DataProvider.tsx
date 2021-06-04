import ALPHABET_RU from "./Alphabet";
import getNameByCode from "./CountryCode";
import MergedData from "./MergedData";

class DataProvider {
    rawData: any;
    SortedrawData: any;
    Number: number = 0;
    
    constructor(JSON: any) {
        this.rawData = JSON;
        this.rawData.sort(this.date_sort);
        //this.rawData.sort(this.letter_sort);
        //let date1 = new Date(`${this.rawData[0].year}/${this.rawData[0].month}/${this.rawData[0].day}`);
        //let date2 = new Date(`${this.rawData[this.rawData.length - 1].year}/${this.rawData[this.rawData.length - 1].month}/${this.rawData[this.rawData.length - 1].day}`);
        //this.SortedrawData = this.getInRange(date1, date2);
    }

    getrawData() {
        return this.rawData;
    }

    getSorted() {
        return this.SortedrawData;
    }

    getInRange(date1: Date, date2: Date) {
        let first;
        let last;

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

        const DataArray = {};
        for (let index = first; index <= last; index++) {

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
        return DataArray;
    }

    date_sort(a, b) {
        var date_a = a.dateRep.split('/');
        var date_b = b.dateRep.split('/');
        return new Date(date_a[2], --date_a[1], date_a[0]).getTime() - new Date(date_b[2], --date_b[1], date_b[0]).getTime();
    }

    letter_sort(search_string: any = null) {
        return function(a, b) {
            // genius code :)
            // this sort json by the first letter of the country name
            // and then adds date sort value
            var date_a = a.dateRep.split('/');
            var date_b = b.dateRep.split('/');
            let dateSort = new Date(date_a[2], --date_a[1], date_a[0]).getTime() - new Date(date_b[2], --date_b[1], date_b[0]).getTime();
            
            if (search_string !== null && getNameByCode(a.geoId).toLowerCase().startsWith(search_string.toLowerCase())) {
                return -999;
            }
            return ALPHABET_RU.indexOf(getNameByCode(a.geoId).charAt(0)) - ALPHABET_RU.indexOf(getNameByCode(b.geoId).charAt(0))
                + dateSort;
        }
      }
}

export default DataProvider