import getNameByCode from "../dataManager/CountryCode";
import Settings from "../dataManager/Settings";

export default class TableChart {
    settings: Settings;

    constructor(settings: Settings) {
        this.settings = settings;
    }
    
    renderRows() {
      let maxItemsOnPage = 20;

      this.settings.rowAmount = 0;
      var html: any = [];
      let maxIndex = maxItemsOnPage;
      let sortedData: any = this.settings.getDataProvider().getDataInRange(
        this.settings.getFirstDate(),
        this.settings.getLastDate(),
        this.settings.getSearchString(),
        this.settings.getFilter(),
        this.settings.getFilterMinMax()[0],
        this.settings.getFilterMinMax()[1]);
      
        let pageI = 0;
      this.settings.maxPage = Math.floor(sortedData.length / maxItemsOnPage);
      
      if (this.settings.currentPage > 1) {
        pageI = this.settings.currentPage * maxItemsOnPage;
        maxIndex = this.settings.currentPage * maxItemsOnPage + maxItemsOnPage;
      }

      for (let i = pageI; i < sortedData.length; i++) {
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