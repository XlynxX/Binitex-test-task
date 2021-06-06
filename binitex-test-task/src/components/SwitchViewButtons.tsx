import Settings from "../dataManager/Settings";

export default function SwitchViewButtons(settings: Settings) {

    const handleTableClick = (e) => {
        settings.setView(0);
        settings.forceUpdate();
    }
  
    const handleChartClick = (e) => {
        settings.setView(1);
        settings.forceUpdate();
    }

    switch (settings.getViewNumber()) {
        case 0:
            return (
                <div className="d-inline-block">
                    <button onClick={ handleTableClick } className='btn btn-primary d-inline-block me-2'>Таблица</button>
                    <button onClick={ handleChartClick } className='btn btn-outline-primary d-inline-block me-2'>График</button>
                </div>
            );
        case 1:
            return (
                <div className="d-inline-block">
                    <button onClick={ handleTableClick } className='btn btn-outline-primary d-inline-block me-2'>Таблица</button>
                    <button onClick={ handleChartClick } className='btn btn-primary d-inline-block me-2'>График</button>
                </div>
            );
        default:
            break;
    }
    return('')
}