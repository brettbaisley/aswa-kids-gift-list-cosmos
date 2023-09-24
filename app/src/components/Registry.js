import React, {useState, useEffect} from "react";
import "./Registry.css";
import { fetchGiftsDB, updateGiftDB } from "../services/GiftService.mjs";
import GiftFilters from "./GiftFilters";
import GiftGrid from "./GiftGrid";
import ToggleButtons from "./ToggleButtons";

const Registry = () => {
    const [filterKids, setFilterKids] = useState(["Mateo", "Lucas"]);
    const [displayType, setDisplayType] = useState('grid');
    const [showFilters, setShowFilters] = useState(false);
    const [hidePurchased, setHidePurchased] = useState(false);
    const [allGifts, setAllGifts] = useState([]);


    useEffect(() => {
        fetchGiftsDB()
            .then(gifts => setAllGifts(gifts))
    },[]);
    

    // const handlePurchased = (updateGift) => {
    //     let newGifts = gifts.map(gift => {
    //         if (gift._id === updateGift._id) {
    //             updateGiftDB(gift._id, {...gift, purchased: !gift.purchased } )
    //             return {...gift, purchased: !gift.purchased }
    //         } else {
    //             return gift;
    //         }
    //     });
    //     setGifts(newGifts);
    // }

    // const handleAdd = (gift) => {
    //     let newGifts = [...gifts, {gift} ];
    //     console.log("GIFTS");
    //     console.log(newGifts);
    //     setGifts(newGifts);

    // }
    
    // const handleDelete = (deleteGift) => {
    //     deleteGiftDB(deleteGift._id)

    //     let newGifts = gifts.filter(gift =>
    //         gift._id !== deleteGift._id
    //     );
    //     setGifts(newGifts);
    // }
    

    const handleFilterToggle = () => {
        setShowFilters(!showFilters);
    }

    const handleDisplayTypeToggle = () => {
        if (displayType === "grid") {
            setDisplayType('list');
        } else {
            setDisplayType('grid');
        }
    }
    
    const handleGiftUpdate = (updatedGift) => {
        let newGifts = allGifts.map(gift => {
            if (gift._id === updatedGift._id) {
                return updatedGift;
            } else {
                return gift;
            }
        });

        // Update the database record for the new updated gift
        updateGiftDB(updatedGift._id, updatedGift);
        setAllGifts(newGifts);
    }


    return (
        <>
        <ToggleButtons 
            showFilters={showFilters} 
            handleFilterToggle={handleFilterToggle} 
            displayType={displayType}
            handleDisplayTypeToggle={handleDisplayTypeToggle}
        />
        <main className="registry">
            <GiftFilters 
                filterKids={filterKids}
                showFilters={showFilters} 
                setFilterKids={setFilterKids}
                hidePurchased={hidePurchased}
                toggleHidePurchased={setHidePurchased}
            />
        
            <GiftGrid 
                giftList={allGifts} 
                hidePurchased={hidePurchased}
                filterKids={filterKids}
                handleUpdate={handleGiftUpdate}              
            />
        </main>
        </>
    )
}

export default Registry;