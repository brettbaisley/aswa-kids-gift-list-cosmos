import React from "react";
import './Gift.css';

const Gift = ( {gift} ) => {
    return (
        <>
            <p className="title">{gift.title}</p>
            <p className="brand">{gift.brand}</p>
            <p className="price">${gift.price}</p>
        </>  
    )
}

export default Gift;