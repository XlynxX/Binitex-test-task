import getNameByCode from "./CountryCode";
import CountryCodeDictionary from "./CountryCode";

class DataProvider {
    DATA: any;
    Number: number = 0;
    associativeArray = {};
    
    constructor(JSON: any) {
        this.DATA = JSON;
        this.calculate();
    }

    calculate() {
        this.sort();
    }

    getInRange(date1: Date, date2: Date) {
        for (let index = 0; index <= this.DATA.length - 1; index++) {
            const element = this.DATA[index];
            //console.log(element.dateRep);
        }
    }

    sort() {
        this.DATA.sort(this.date_sort);
        //this.DATA.sort(this.letterSort)
    }

    date_sort(a, b) {
        var date_a = a.dateRep.split('/');
        var date_b = b.dateRep.split('/');
        return new Date(date_a[2], --date_a[1], date_a[0]).getTime() - new Date(date_b[2], --date_b[1], date_b[0]).getTime();
    }

    letterSort(a, b) {
        const collator: Intl.Collator = new Intl.Collator('ru');
        return function () {
            return collator.compare(getNameByCode(a.geoId), getNameByCode(b.geoId));
        }
      }

    test() {
    }
}

export default DataProvider