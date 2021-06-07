import Settings from "../dataManager/Settings";

export default function Buttons(settings: Settings) {
    
    if (settings.getViewNumber() !== 0 || settings.rowAmount == 0) {
        return '';
    }

    const handleNextClick = () => {
        settings.currentPage += 1;
        settings.forceUpdate();
    }

    const handleBackClick = () => {
        settings.currentPage -= 1;
        settings.forceUpdate();
    }

    const handleLastClick = () => {
        settings.currentPage = settings.maxPage;
        settings.forceUpdate();
    }

    const handleFirstClick = () => {
        settings.currentPage = 1;
        settings.forceUpdate();
    }

    const changeToPage = (page: number) => {
        settings.currentPage = page;
        settings.forceUpdate();
    } 
    
    var html: any = [];
    // back buttons
    if (settings.currentPage > 1) 
    {
        html.push(<button onClick={ handleBackClick } className='btn btn-outline-primary d-inline-block me-2'>&laquo; Назад</button>)
        if (settings.currentPage > 2) 
        {
            html.push(<button onClick={ handleFirstClick } className='btn btn-outline-primary d-inline-block me-2'>...</button>)
            for (let index = settings.currentPage - 2; index < settings.currentPage; index++) 
            {
                html.push(<button onClick={ () => { changeToPage(index) } } className='btn btn-outline-primary d-inline-block me-2'>{ index }</button>)
            }
        } 
        else 
        {
            for (let index = settings.currentPage - 1; index < settings.currentPage; index++) 
            {
                html.push(<button onClick={ () => { changeToPage(index) } } className='btn btn-outline-primary d-inline-block me-2'>{ index }</button>)
            }
        }
    }
    // current page button
    html.push(<button className='btn btn-primary d-inline-block me-2'>{ settings.currentPage }</button>)
    
    // next buttons
    if (settings.currentPage > 0 && settings.currentPage < settings.maxPage && settings.maxPage > settings.currentPage) 
    {
        html.push(<button onClick={ () => { changeToPage(settings.currentPage + 1) } } className='btn btn-outline-primary d-inline-block me-2'>{ settings.currentPage + 1 }</button>)
        if (settings.maxPage > settings.currentPage + 1) {
            html.push(<button onClick={ () => { changeToPage(settings.currentPage + 2) } } className='btn btn-outline-primary d-inline-block me-2'>{ settings.currentPage + 2 }</button>)
            html.push(<button onClick={ handleLastClick } className='btn btn-outline-primary d-inline-block me-2'>...</button>)
            html.push(<button onClick={ handleNextClick } className='btn btn-outline-primary d-inline-block'>Следующая &raquo;</button>)
        }
    }

    return html;
}