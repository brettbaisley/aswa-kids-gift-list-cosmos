import React from "react";
import './FilterGifts.css';

const FilterGifts = ({handleShowPurchased}) => {
    return (
        <div className="filter-gifts">
            <p>Filter(s):</p>
            <div>
                <input type="checkbox" name="hidepurchased" id="hidepurchased" onChange={handleShowPurchased}/>
                <label htmlFor="hidepurchased">Show Purchased</label>
            <select name="children" id="children">
                <option value="all">All</option>
                <option value="mateo">Mateo</option>
                <option value="lucas">Lucas</option>
            </select>
            </div>
        </div>
    )
}

export default FilterGifts;