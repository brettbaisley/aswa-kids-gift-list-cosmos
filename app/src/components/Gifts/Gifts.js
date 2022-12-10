import React from "react";
import Gift from './Gift';
import GiftActions from './GiftActions';
import './Gifts.css';

const Gifts = ( {gifts, handlePurchased, handleDelete} ) => {

    if (!gifts) return(<p>No Gifts to Display.</p>)

    return (
        <ul className="gift-list">
            { gifts.map( (gift) => {
                const purchasedClass = gift.purchased ? "gift purchased" : "gift";
                return (
                    <li key={gift._id} className={purchasedClass}>
                        <Gift gift={gift} />
                        <GiftActions gift={gift} handlePurchased={handlePurchased} handleDelete={handleDelete} />
                    </li>
                )
            })}
        </ul>
    )
}

export default Gifts;