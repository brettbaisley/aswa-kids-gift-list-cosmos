import React, {useState, useEffect} from "react";
import "./Registry.css";
import { fetchGiftsDB, updateGiftDB, deleteGiftDB } from "../services/GiftService.mjs";
import GiftDisplayOptions from "./GiftDisplayOptions";
import GiftFilters from "./GiftFilters";
import GiftGrid from "./GiftGrid";


const Registry = () => {
    const [mateoSelected, setMateoSelected] = useState(true);
    const [lucasSelected, setLucasSelected] = useState(true);
    const [displayType, setDisplayType] = useState('grid');
    const [sortBy, setSortBy] = useState('Date Added');
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
    
    // const handleHidePurchased = () => {
    //     console.log("Handling Hide Purchased");
    //     setHidePurchased(!hidePurchased);
    // }
    
    // const handleFilterKids = (kid) => {
    //     console.log("Handling filter kids: ", kid);
    //     kid === "All" ? setShowChild("All") : setShowChild(kid);
    // }


    return (
        <main className="registry">
            <GiftFilters 
                mateoSelected={mateoSelected}
                lucasSelected={lucasSelected}
                hidePurchased={hidePurchased}
                toggleMateo={setMateoSelected} 
                toggleLucas={setLucasSelected}
                toggleHidePurchased={setHidePurchased}
            />
            <GiftDisplayOptions 
                displayType={displayType} 
                setDisplayType={setDisplayType}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />
            <GiftGrid 
                giftList={allGifts} 
                displayType={displayType} 
                mateoSelected={mateoSelected}
                lucasSelected={lucasSelected}
                toggleMateoSelected={setMateoSelected}
                toggleLucasSelected={setLucasSelected}
            />
        </main>
    )
}

export default Registry;