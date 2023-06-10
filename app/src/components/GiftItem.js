import React, { useState } from 'react';
import './GiftItem.css';


const DisplayGiftItem = ( {gift, handleStartEdit} ) => {
    return (
        <>
            <p className="title">{gift.title}</p>
            <p className="brand">{gift.brand}</p>
            <p className="price">${gift.price}</p>

            <button onClick={handleStartEdit}><i class="fa-light fa-square-pen"></i></button>
        </>
    )
}

const EditGiftItem = ( {gift, handleTextChange, handleUpdateGift, handleStopEdit} ) => {
    return (
        <>
        <input type="text" name="title" id="title" value={gift.title} onChange={handleTextChange}></input>
        
        <input type="text" name="brand" id="brand" value={gift.brand} onChange={handleTextChange}></input>

        <input type="text" name="price" id="price" value={gift.price} onChange={handleTextChange}></input>

        <div className="btn-group">
            <button className="success" onClick={handleUpdateGift}><i class="fa-light fa-pen"></i></button>
            <button className="warning" onClick={handleStopEdit}><i class="fa-light fa-ban"></i></button>
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