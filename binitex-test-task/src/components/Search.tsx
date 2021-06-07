import { Dropdown, DropdownButton } from "react-bootstrap";
import getNameByCode from "../dataManager/CountryCode";
import Settings from "../dataManager/Settings";

export default function Search(settings: Settings) {

    const searchByLetter = (string: any) => {
        settings.setSearchString(string);
        settings.forceUpdate();
      }

    const getCurrentCountry = () => {
        if (settings.getSearchCountry() === 'all') {
            return 'Все страны';
        }
        return getNameByCode(settings.getSearchCountry());
    }
    
    const renderItems = () => {
        var html: any = [];
        let countryList = settings.getDataProvider().getCountries(settings.getFirstDate(), settings.getLastDate());
        let elementId: any;
        
        html.push(<Dropdown.Item eventKey='all'>Все страны</Dropdown.Item>);
        for (elementId in countryList) {
            if (getNameByCode(countryList[elementId]) !== '') {
                html.push(<Dropdown.Item eventKey={ countryList[elementId] }>{ getNameByCode(countryList[elementId]) }</Dropdown.Item>)
            }
        }

        return html;
    }

    if (settings.currentView === 0) {
        return(
            <div className="form-outline mb-3 mt-2">
                <input onChange={ (value: any) => { searchByLetter(value.target.value); } } type="search" id="form1" className="form-control me-3 w-50 d-inline-block" placeholder="Поиск страны..." aria-label="Search"/>
    
                <div className="d-inline-block">
                    <DropdownButton onSelect={ (input) => { settings.setFilterBy(input); } } id="dropdown-basic-button border-5" title="Фильтровать по... ">
                        <Dropdown.Item eventKey='caseAmount'>По количеству случаев</Dropdown.Item>
                        <Dropdown.Item eventKey='deathAmount'>По количеству смертей</Dropdown.Item>
                    </DropdownButton>
                </div>
                <div className='dropdown-inputs mx-3'>
                    <input onChange={ (input) => { if (parseInt(input.target.value) === NaN) { settings.setMinFilter(null) }; settings.setMinFilter(parseInt(input.target.value)) } } type="number" className='filter-input d-inline-block me-3' placeholder='Значение от' />
                    <input onChange={ (input) => { if (parseInt(input.target.value) === NaN) { settings.setMaxFilter(null) }; settings.setMaxFilter(parseInt(input.target.value)) } } type="number" className='filter-input d-inline-block' placeholder='Значение до' />
                </div>
            </div>
        )
    } else {
        return(
            <div className="form-outline mb-3 mt-2">
                <div className="d-inline-block">
                    <h2>{ getCurrentCountry() }</h2>
                    <DropdownButton onSelect={ (input: any) => { settings.setSearchCountry(input); } } id="dropdown-basic-button border-5" title="Выбрать страну... ">
                        { renderItems() }
                    </DropdownButton>
                </div>
            </div>
        )
    }
} 