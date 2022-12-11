import React from "react";
import './FilterGifts.css';

const FilterGifts = ({handleHidePurchased, handleFilterKids}) => {
    return (
        <div className="filter-gifts">
            <p>Filter(s):</p>
            <div>
                <input type="checkbox" name="hidepurchased" id="hidepurchased" onChange={handleHidePurchased}/>
                <label htmlFor="hidepurchased">Hide Purchased</label>
            <select name="kidFilter" id="kidFilter" onChange={(e) => handleFilterKids(e.target.value)}>
                <option value="All">All</option>
                <option value="Mateo">Mateo</option>
                <option value="Lucas">Lucas</option>
            </select>
            </div>
        </div>
    )
}

export default FilterGifts;