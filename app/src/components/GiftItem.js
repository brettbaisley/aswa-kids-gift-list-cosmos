import React, { useState } from 'react';
import './GiftItem.css';
import { useAuthContext } from "../context/AuthContext";

const DisplayGiftItem = ( {gift, handleStartEdit} ) => {
    const [userInfo] = useAuthContext();
    return (
        <>
            <p className="giftId">{gift._id}</p>
            <p className="giftTitle">{gift.title}</p>
            <p className="giftBrand">{gift.brand}</p>
            <p className="giftPrice">${gift.price}</p>
            <p className="giftIdPurchased">{gift.purchased ? "Purchased" : "Available"}</p>
            <p className="giftKids">{gift.kids.join(", ")}</p>

            {
                userInfo && <button onClick={handleStartEdit}><i className="fa-light fa-square-pen"></i></button>
            }
        </>
    )
}

const EditGiftItem = ( {gift, handleTextChange, handleUpdateGift, handleStopEdit} ) => {
    return (
        <>
        <p className="giftId">{gift._id}</p>

        <input type="text" name="title" id="title" value={gift.title} onChange={handleTextChange}></input>
        
        <input type="text" name="brand" id="brand" value={gift.brand} onChange={handleTextChange}></input>

        <input type="text" name="price" id="price" value={gift.price} onChange={handleTextChange}></input>

        <div><input type="checkbox" name="purchased" id="purchased" checked={gift.purchased}></input><label for="purchased">Purchased</label></div>

        <div><input type="checkbox" name="Mateo" id="Mateo" checked={gift.kids.includes("Mateo")}></input><label for="Mateo">Mateo</label></div>
        <div><input type="checkbox" name="Lucas" id="Lucas" checked={gift.kids.includes("Lucas")}></input><label for="Lucas">Lucas</label></div>

        <div className="btn-group">
            <button className="success" onClick={handleUpdateGift}><i className="fa-light fa-pen"></i></button>
            <button className="warning" onClick={handleStopEdit}><i className="fa-light fa-ban"></i></button>
        </div>
        </>
    )
}

const GiftItem = ( {gift, handleUpdate } ) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedGift, setUpdatedGift] = useState({...gift});

    const handleStartEdit = () => {
        setIsEditing(true);
    };

    const handleStopEdit = () => {
        setIsEditing(false);
    };

    const handleTextChange = (e) => {
        setUpdatedGift( {...updatedGift, [e.target.name]: e.target.value });
    };

    const handleUpdateGift = () => {
        handleUpdate(updatedGift)
        setIsEditing(false);
    };


    if (isEditing) {
        return <EditGiftItem gift={updatedGift} handleTextChange={handleTextChange} handleUpdateGift={handleUpdateGift} handleStopEdit={handleStopEdit} />
    }
    return <DisplayGiftItem gift={gift} handleStartEdit={handleStartEdit}  />
}

export default GiftItem;