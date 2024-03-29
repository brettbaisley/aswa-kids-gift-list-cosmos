import React from "react";
import Gift from './Gift';
import './Gifts.css';

const Gifts = ( {gifts, handlePurchased, handleDelete, hidePurchased, showChild, submitEditForm, idInput, titleInput, brandInput, priceInput} ) => {

    if (!gifts) return(<p>No Gifts to Display.</p>)

    return (
        <ul className="gift-list">
            { gifts.map( (gift) => {
                const purchasedClass = gift.purchased ? "gift purchased" : "gift";

                if (hidePurchased && gift.purchased) {
                        return (null)
                } else if (showChild !== "All" && !gift.kids.includes(showChild)) {
                    return (null)
                } else {
                    return (
                        <li key={gift._id} className={purchasedClass}>
                            <Gift gift={gift} />
                        </li>
                    )
                }
            })}
        </ul>
    )
}

export default Gifts;