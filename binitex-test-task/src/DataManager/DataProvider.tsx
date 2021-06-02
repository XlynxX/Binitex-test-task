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
        let yr: any = 2021;
        let dt: any = '';
        console.log(`year: ${this.DATA[60818 - 2].year}, date: ${this.DATA[60818 - 2].dateRep}`)
        console.log(`year: ${this.DATA[60818 - 1].year}, date: ${this.DATA[60818 - 1].dateRep}`)
        console.log(`year: ${this.DATA[60818].year}, date: ${this.DATA[60818].dateRep}`)
        console.log(`year: ${this.DATA[60818 + 2].year}, date: ${this.DATA[60818 + 2].dateRep}`)
        console.log(`year: ${this.DATA[60818 + 1].year}, date: ${this.DATA[60818 + 1].dateRep}`)
        for (let index = this.DATA.length - 1; index > 0; index--) {
            const element = this.DATA[index];
            //console.log(element.dateRep);
            if (element.year < yr) {
                yr = element.year;
                dt = index;
            }
        }
        //console.log(yr + ' / ' + dt)
    }
}

export default DataProvider