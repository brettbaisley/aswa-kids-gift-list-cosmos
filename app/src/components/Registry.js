import React, {useState, useEffect} from "react";
import "./Registry.css";
import FilterGifts from "./Gifts/FilterGifts";
import Gifts from "./Gifts/Gifts";

import giftsJSON from '../gift_data.json';


const Registry = () => {
    const [gifts, setGifts] = useState(null);
    const [hidePurchased, setHidePurchased] = useState(false);
    const [showChild, setShowChild] = useState("All");
    

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
    
    const handleHidePurchased = () => {
        console.log("Handling Hide Purchased");
        setHidePurchased(!hidePurchased);
    }
    
    const handleFilterKids = (kid) => {
        console.log("Handling filter kids: ", kid);
        kid === "All" ? setShowChild("All") : setShowChild(kid);
    }

    return (
        <section className="wrapper">
            <FilterGifts handleHidePurchased={handleHidePurchased} handleFilterKids={handleFilterKids} />
            <Gifts gifts={gifts} handlePurchased={handlePurchased} handleDelete={handleDelete} hidePurchased={hidePurchased} showChild={showChild}  />
        </section>
    )
}

export default Registry;