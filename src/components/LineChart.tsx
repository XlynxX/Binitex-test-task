import ReactApexChart from "react-apexcharts";
import Settings from "../dataManager/Settings";

export default class LineChart {
  settings: Settings;
  state: any;
  
  constructor(settings: Settings) {
    this.settings = settings;
    this.state = {
    
      series: [],
      options: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: true
        },
        stroke: {
          curve: 'smooth'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          categories: [],
        }
      },
    
    
    };
  }
  monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

  loadChartData() {
    var categories: any = [];
    var cases: any = [];
    var deaths: any = [];
    var chartStats = this.settings.getDataProvider().getChartStats(this.settings.getFirstDate(), this.settings.getLastDate(), this.settings.getSearchCountry())
    
    let i: number = 0;
    for (let m = 0; i <= chartStats.length; i++) {
      if (m >= 12) { m = 0; }
      categories.push(this.monthNames[m]);
      m++;
    }

    let elementId: any;
    for (elementId in chartStats) {
      cases.push(chartStats[elementId].cases);
      deaths.push(chartStats[elementId].deaths);
    }

    this.state.options.xaxis.categories = categories;
    this.state.series = [
      {
        name: 'Случаи',
        data: cases,
      },
      {
        name: 'Смерти',
        data: deaths,
      },
    ]
  }

  render() {
    this.loadChartData();
    
    return(
      <div className="container-xxl">
        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={410} />
      </div>
    )
  }
}