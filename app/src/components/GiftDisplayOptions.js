import "./GiftDisplayOptions.css";

const GiftDisplayOptions = ({displayType, setDisplayType, sortBy, setSortBy}) => { 
    const sortByOptions = ['Date Added', 'Price'];


    return (
        <div className="gift-display-options">
            <div>
                <button onClick={() => setDisplayType('grid')}>Grid</button>
                <button onClick={() => setDisplayType('list')}>List</button>
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