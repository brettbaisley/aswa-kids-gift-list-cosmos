import React, {useState, useEffect} from "react";
import "./Registry.css";
import { fetchGiftsDB, updateGiftDB, deleteGiftDB } from "../services/GiftService.mjs";
import FilterGifts from "./Gifts/FilterGifts";
import Gifts from "./Gifts/Gifts";
import GiftAdd from "./Gifts/GiftAdd";



const Registry = () => {
    const [gifts, setGifts] = useState(null);
    const [hidePurchased, setHidePurchased] = useState(false);
    const [showChild, setShowChild] = useState("All");
    const [showAddGift, setShowAddGift] = useState(false);

    useEffect(() => {
        fetchGiftsDB()
            .then(gifts => setGifts(gifts))
    },[]);

    const handlePurchased = (updateGift) => {
        let newGifts = gifts.map(gift => {
            if (gift._id === updateGift._id) {
                console.log(`DEBUG: ${JSON.stringify(gift)}`);
                updateGiftDB(gift._id, {...gift, purchased: !gift.purchased } )
                return {...gift, purchased: !gift.purchased }
            } else {
                return gift;
            }
        });
        setGifts(newGifts);
    }

    const handleDelete = (deleteGift) => {
        deleteGiftDB(deleteGift._id)

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
            <Gifts gifts={gifts} 
                handlePurchased={handlePurchased} 
                handleDelete={handleDelete} 
                hidePurchased={hidePurchased} 
                showChild={showChild} 
            />
            <button className="add-button" onClick={() => setShowAddGift(!showAddGift)}>ADD</button>

            { showAddGift && <GiftAdd toggleForm={setShowAddGift} /> }
        </section>
    )
}

export default Registry;