import getNameByCode from "../dataManager/CountryCode";
import Settings from "../dataManager/Settings";

export default class DaTable {
    settings: Settings;

    constructor(settings: Settings) {
        this.settings = settings;
    }
    
    renderRows() {
      this.settings.rowAmount = 0;
      var html: any = [];
      let maxIndex = 20;
      let sortedData: any = this.settings.getDataProvider().getInRange(this.settings.getFirstDate(), this.settings.getLastDate(), this.settings.getSearchString());
      let elementId: any;
      for (elementId in sortedData) {

        if (getNameByCode(sortedData[elementId].geoId) == '') {
          maxIndex++;
          continue;
        }

        this.settings.rowAmount++;
          html.push(
            <tr className='table-row'>
              <td>{getNameByCode(sortedData[elementId].geoId)}</td>
              <td>{sortedData[elementId].cases}</td>
              <td>{sortedData[elementId].deaths}</td>
              <td>{this.settings.dataProvider.getCasesArr()[sortedData[elementId].geoId]}</td>
              <td>{this.settings.dataProvider.getDeathsArr()[sortedData[elementId].geoId]}</td>
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