import "./GiftFilters.css";

const GiftFilters = ({ filterKids, setFilterKids, showFilters, hidePurchased, toggleHidePurchased}) => { 
    const kidsList = ["Mateo", "Lucas"];
    

    return (
        <div className={showFilters ? "filters filters-expanded" : "filters"}>
            <h2>Kids</h2>
            <ul>
                { 
                    kidsList.map(kid => {
                        return (
                            <li key={kid}>
                                <input type="checkbox" 
                                    id={kid} 
                                    name={kid} 
                                    checked={filterKids.includes(kid)} 
                                    onChange={() => setFilterKids(filterKids.includes(kid) ? filterKids.filter(k => k !== kid) : [...filterKids, kid])} 
                                />
                                <label htmlFor={kid}>{kid}</label>
                            </li>
                        )
                    })
                }
            </ul>
            <h2>Status</h2>
            <ul>
                <li><input type="checkbox" id="hidepurchased" name="hidepurchased" checked={hidePurchased} onChange={() => toggleHidePurchased(!hidePurchased)} /><label htmlFor="hidepurchased">Hide Purchased</label></li>
            </ul>
            <h2>Price</h2>
            <ul>
                <li>$0 - $25</li>
                <li>$25 - $50</li>
                <li>$50 - $100</li>
                <li>$100+</li>
            </ul>
        </div>
    )
}

export default GiftFilters;