import getNameByCode from "../DataManager/CountryCode";
import Settings from "../DataManager/Settings";

export default class Table {
    settings: Settings;

    constructor(settings: Settings) {
        this.settings = settings;
    }
    
    renderRows() {
        this.settings.rowAmount = 0;
        var html: any = [];
        let maxIndex = 20;
        let SortedData: any = this.settings.getDataProvider().getInRange(this.settings.getFirstDate(), this.settings.getLastDate());
        let elementId: any;
        for (elementId in SortedData) {
  
          if (getNameByCode(elementId) == '') {
            maxIndex++;
            continue;
          }
  
          this.settings.rowAmount++;
          html.push(
          <tr className='table-row'>
            <td>{getNameByCode(elementId)}</td>
            <td>{SortedData[elementId].cases}</td>
            <td>{SortedData[elementId].deaths}</td>
            <td>{SortedData[elementId].cases}</td>
            <td>{SortedData[elementId].deaths}</td>
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