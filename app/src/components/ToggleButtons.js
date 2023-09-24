import './ToggleButtons.css';



const ToggleButtons = ({showFilters, handleFilterToggle, displayType, handleDisplayTypeToggle}) => {
    return (
        <div className="toggleButtons">
            <button id ="toggleFilter" className="toggleFilter" onClick={handleFilterToggle}>
                {
                    showFilters ? <i className="fa-light fa-filter-slash"></i> : <i className="fa-light fa-filter"></i>
                }
            </button>
            <button id ="toggleGrid" className="toggleGrid" onClick={handleDisplayTypeToggle}>
                {
                    displayType === "grid" ? <i className="fa-light fa-list"></i> : <i className="fa-light fa-grid"></i>
                }
                </button>
        </div>
    )
}

export default ToggleButtons;