import getNameByCode from "../dataManager/CountryCode";
import Settings from "../dataManager/Settings";

export default class TableChart {
    settings: Settings;

    constructor(settings: Settings) {
        this.settings = settings;
    }
    
    renderRows() {
      this.settings.rowAmount = 0;
      var html: any = [];
      let maxIndex = 20;
      let sortedData: any = this.settings.getDataProvider().getDataInRange(this.settings.getFirstDate(), this.settings.getLastDate(), this.settings.getSearchString());

      for (let i = 0; i < sortedData.length; i++) {

        if (getNameByCode(sortedData[i].geoId) == '') {
          maxIndex++;
          continue;
        }

        if (i >= maxIndex) break;

        this.settings.rowAmount++;
          html.push(
            <tr className='table-row'>
              <td>{getNameByCode(sortedData[i].geoId)}</td>
              <td>{sortedData[i].cases}</td>
              <td>{sortedData[i].deaths}</td>
              <td>{this.settings.dataProvider.getCasesArr()[sortedData[i].geoId]}</td>
              <td>{this.settings.dataProvider.getDeathsArr()[sortedData[i].geoId]}</td>
              <td>Нет данных</td>
              <td>Нет данных</td>
            </tr>
            )
        }
  
        if (html == '') {
          return ''
        }
        
        return html;
      }

    render() {
        return(
            <table className='table table-striped mt-3'>
            <thead className='table-head table-light'>
              <tr>
                <th>Страна</th>
                <th>Количество случаев</th>
                <th>Количество смертей</th>
                <th>Количество случаев всего</th>
                <th>Количество смертей всего</th>
                <th>Количество случаев на 1&nbsp;000 жителей</th>
                <th>Количество смертей на 1&nbsp;000 жителей</th>
              </tr>
            </thead>
            <tbody>
              { this.renderRows() }
            </tbody>
          </table>
        )
    }
}