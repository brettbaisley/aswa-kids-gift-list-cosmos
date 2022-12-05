import React from "react";
import './Gift.css';
import Modal from '../Modal';
import EditGift from './EditGift';

const Gift = ( {gift} ) => {

    const purchasedClass = gift.purchased ? "gift purchased" : "gift";
    return (
        <li className={purchasedClass}>
            <p className="title">{gift.title}</p>
            <p className="brand">{gift.brand}</p>
            <p className="price">${gift.price}</p>
            <div className="actions">
                <Modal openText="Edit">
                    <EditGift gift={gift} />
                </Modal>
                <button>Mark Purchased</button>
                <button>Delete</button>
            </div>
        </li>
    )
}

export default Gift;