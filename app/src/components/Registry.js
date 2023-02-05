import React, {useState, useEffect, useRef} from "react";
import "./Registry.css";
import FilterGifts from "./Gifts/FilterGifts";
import Gifts from "./Gifts/Gifts";

import { fetchGiftsJSON } from "../services/GiftService.mjs";


const Registry = () => {
    const [gifts, setGifts] = useState(null);
    const [hidePurchased, setHidePurchased] = useState(false);
    const [showChild, setShowChild] = useState("All");

    const titleInput = useRef(null);
    const brandInput = useRef(null);
    const priceInput = useRef("0.00");


    useEffect(() => {
        fetchGiftsJSON().then(gifts => setGifts(gifts))
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

    const handleEditForm = (event) => {
        event.preventDefault();
        console.log("Handling submit of edit form")
        console.log(`Title: ${titleInput.current.value}`)
        console.log(`Brand: ${brandInput.current.value}`)
        console.log(`Price: ${priceInput.current.value}`)

    }

    return (
        <section className="wrapper">
            <FilterGifts handleHidePurchased={handleHidePurchased} handleFilterKids={handleFilterKids} />
            <Gifts gifts={gifts} 
                handlePurchased={handlePurchased} 
                handleDelete={handleDelete} 
                hidePurchased={hidePurchased} 
                showChild={showChild} 
                submitEditForm={handleEditForm}
                titleInput={titleInput}
                brandInput={brandInput}
                priceInput={priceInput}
            />
        </section>
    )
}

export default Registry;