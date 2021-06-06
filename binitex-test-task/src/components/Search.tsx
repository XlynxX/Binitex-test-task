import { Dropdown, DropdownButton } from "react-bootstrap";
import Settings from "../dataManager/Settings";

export default function Search(settings: Settings) {

    const searchByLetter = (string: any) => {
        settings.setSearchString(string);
        settings.forceUpdate();
      }
    
    return(
        <div className="form-outline mb-3 mt-2">
            <input onChange={ (value: any) => {
              searchByLetter(value.target.value);
              } } type="search" id="form1" className="form-control me-3 w-75 d-inline-block" placeholder="Поиск страны..." aria-label="Search"/>

              <div className="d-inline-block">
                <DropdownButton id="dropdown-basic-button border-5" title="Фильтровать по... ">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>
              </div>
          </div>
    )
} 