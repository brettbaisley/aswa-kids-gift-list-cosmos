import React from "react";
import './FilterGifts.css';

const FilterGifts = () => {
    return (
        <div className="filter-gifts">
            <p>Filter(s):</p>
            <input type="checkbox" name="hidepurchased" id="hidepurchased" />
            <label htmlFor="hidepurchased">Show Purchased</label>
            <select name="children" id="children">
                <option value="all">All</option>
                <option value="mateo">Mateo</option>
                <option value="lucas">Lucas</option>
            </select>
        </div>
    )
}

export default FilterGifts;