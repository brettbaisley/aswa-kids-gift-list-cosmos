import React, {useState, useEffect} from "react";
import "./Registry.css";
import FilterGifts from "./Gifts/FilterGifts";
import Gifts from "./Gifts/Gifts";

import giftsJSON from '../gift_data.json';


const Registry = () => {
    const [gifts, setGifts] = useState(null);

    useEffect(() => {
        setGifts(giftsJSON);
    },[]);

    const handlePurchased = (updateGift) => {
        let newGifts = gifts.map(gift => {
            if (gift._id === updateGift._id) {
                return {...gift, purchased: !gift.purchased }
            } else {
                return gift;
            }
        });
        setGifts(newGifts);
    }

    const handleDelete = (deleteGift) => {
        let newGifts = gifts.filter(gift =>
            gift._id !== deleteGift._id
        );
        setGifts(newGifts);
    }
    
    return (
        <section className="wrapper">
            <FilterGifts />
            <Gifts gifts={gifts} handlePurchased={handlePurchased} handleDelete={handleDelete} />
        </section>
    )
}

export default Registry;