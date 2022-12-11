import React, {useState, useEffect} from "react";
import "./Registry.css";
import FilterGifts from "./Gifts/FilterGifts";
import Gifts from "./Gifts/Gifts";

import giftsJSON from '../gift_data.json';


const Registry = () => {
    const [gifts, setGifts] = useState(null);
    const [showPurchased, setShowPurchased] = useState(true);
    // const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        // setGifts(giftsJSON);

        let allGifts = giftsJSON;
        let filteredGifts = [];

        
        // Filter ShowPurchased
        if (!showPurchased) {
            filteredGifts = (allGifts.filter(gift => 
                gift.purchased === false
            ));
            setGifts(filteredGifts);
        } else {
            setGifts(allGifts);
        }
        
        
        //Filter Child
        
        // setGifts(filteredGifts);

    },[showPurchased]);

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
    
    const handleShowPurchased = () => {
        console.log("Handling filter toggle");
        setShowPurchased(!showPurchased);
    }

    return (
        <section className="wrapper">
            <FilterGifts handleShowPurchased={handleShowPurchased} />
            <Gifts gifts={gifts} handlePurchased={handlePurchased} handleDelete={handleDelete}/>
        </section>
    )
}

export default Registry;