import "./GiftFilters.css";

const GiftFilters = ({ mateoSelected, lucasSelected, hidePurchased, toggleMateo, toggleLucas, toggleHidePurchased}) => { 
    

    return (
        <div className="filters">
            <h2>Kids</h2>
            <ul>
                <li><input type="checkbox" id="mateo" name="mateo" checked={mateoSelected} onChange={() => toggleMateo(!mateoSelected)} /><label htmlFor="mateo">Mateo</label></li>
                <li><input type="checkbox" id="lucas" name="lucas" checked={lucasSelected} onChange={() => toggleLucas(!lucasSelected)} /><label htmlFor="lucas">Lucas</label></li>
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