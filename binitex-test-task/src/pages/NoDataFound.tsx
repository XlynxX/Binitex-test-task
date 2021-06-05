import Settings from "../dataManager/Settings";

export default function NoDataFound(settings: Settings) {

    if (settings.rowAmount == 0) {
        return(
            <div className="continer">
                <h1 className='text-center mb-3'>Данных не найдено</h1>
            </div>
        )
        return;
    }
    return('');
    
}