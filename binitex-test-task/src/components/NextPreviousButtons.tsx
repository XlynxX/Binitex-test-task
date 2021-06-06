import Settings from "../dataManager/Settings";

export default function Buttons(settings: Settings) {
    
    if (settings.getViewNumber() !== 0) {
        return '';
    }
    
    var html: any = [];
    // back buttons
    html.push(<button className='btn btn-outline-primary d-inline-block me-2'>&laquo; Назад</button>)
    if (settings.currentPage > 3) {
        html.push(<button className='btn btn-outline-primary d-inline-block me-2'>...</button>)
        for (let index = settings.currentPage - 2; index < settings.currentPage; index++) {
            html.push(<button className='btn btn-outline-primary d-inline-block me-2'>{ index }</button>)
        }
    }
    // current page button
    html.push(<button className='btn btn-primary d-inline-block me-2'>{ settings.currentPage }</button>)
    
    // next buttons
    if (settings.currentPage > 0) {
        for (let index = settings.currentPage + 1; index <= settings.currentPage + 2; index++) {
            html.push(<button className='btn btn-outline-primary d-inline-block me-2'>{ index }</button>)
        }
        html.push(<button className='btn btn-outline-primary d-inline-block me-2'>...</button>)
    }
    html.push(<button className='btn btn-outline-primary d-inline-block'>Следующая &raquo;</button>)

    return html;
}