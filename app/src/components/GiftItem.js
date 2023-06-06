import React, { useState } from 'react';
import Modal from './Modal';
import './GiftItem.css';



const GiftItem = ( {gift} ) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedGift, setUpdatedGift] = useState({...gift});

    const handleOpenModal = () => {
        setIsEditing(true);
    };

    const handleCloseModal = () => {
        setIsEditing(false);
    };

    const handleTextChange = (e) => {
        setUpdatedGift( {...updatedGift, [e.target.name]: e.target.value });
    };

    const handleUpdateGift = () => {
        // Logic to update the todo item with the updated title
        // For simplicity, let's assume it updates the todo item in a todo list array
        // Replace this with your actual logic to update the todo item
        const updatedGift = { ...gift, title: gift.title };
        // Logic to update the todo item in the todo list array
        // e.g., updateTodoItem(updatedTodo);
        console.log('Updated gift:', updatedGift);
        setIsEditing(false);
    };

    return (
        <>
            <p className="title">{gift.title}</p>
            <p className="brand">{gift.brand}</p>
            <p className="price">${gift.price}</p>

            <button onClick={handleOpenModal}>Edit</button>

            <Modal isOpen={isEditing} onClose={handleCloseModal}>
                <h2>Edit Gift</h2>

                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" value={updatedGift.title} onChange={handleTextChange}></input>
                
                <label htmlFor="brand">Brand</label>
                <input type="text" name="brand" id="brand" value={updatedGift.brand} onChange={handleTextChange}></input>

                <label htmlFor="price">Price</label>
                <input type="text" name="price" id="price" value={updatedGift.price} onChange={handleTextChange}></input>

                <div className="btn-group">
                    <button onClick={handleUpdateGift}>Update</button>
                    <button onClick={handleCloseModal}>Cancel</button>
                </div>
            </Modal>
        </>  
    )
}

export default GiftItem;