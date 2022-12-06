import React from "react";
import './Gift.css';
import EditGiftModal from './EditGiftModal';

const Gift = ( {gift, handleUpdate} ) => {

    const purchasedClass = gift.purchased ? "gift purchased" : "gift";
    return (
        <li className={purchasedClass}>
            <p className="title">{gift.title}</p>
            <p className="brand">{gift.brand}</p>
            <p className="price">${gift.price}</p>
            <div className="actions">
                <EditGiftModal gift={gift} />
                <button>Mark Purchased</button>
                <button>Delete</button>
            </div>
        </li>
    )
}

export default Gift;