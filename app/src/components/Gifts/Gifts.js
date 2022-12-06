import React from "react";
import Gift from './Gift';
import './Gifts.css';

const Gifts = ( {gifts} ) => {
    return (
        <ul className="gift-list">
            { gifts && gifts.map( (gift) => {
                return (
                    <Gift key={gift._id} gift={gift}  />
                )
            })}
        </ul>
    )
}

export default Gifts;