import "./GiftDisplayOptions.css";

const GiftDisplayOptions = ({displayType, setDisplayType, sortBy, setSortBy}) => { 
    const sortByOptions = ['Date Added', 'Price'];


    return (
        <div className="gift-display-options">
            <div>
                <button onClick={() => setDisplayType('grid')}><i className="fa-light fa-grid"></i></button>
                <button onClick={() => setDisplayType('list')}><i className="fa-light fa-list"></i></button>
            </div>

            <div>
                <label htmlFor="sortBySelect">Sort By:</label>
                <select name="sortBySelect" id="sortBySelect" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    {sortByOptions.map((value, i) => {
                        return (<option key={i} value={value}>{value}</option>)
                    })}
                </select>
            </div>
        </div>
    )
}

export default GiftDisplayOptions;