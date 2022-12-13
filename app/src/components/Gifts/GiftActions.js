import React from "react";
import './GiftActions.css';
import EditGiftModal from './EditGiftModal';

const GiftActions = ( {gift, handlePurchased, handleDelete, submitEditForm, titleInput, brandInput, priceInput} ) => {
    const purchaseButtonText = (!gift.purchased) ? "Purchase" : "Unpurchase";
    return (
        <div className="actions">
            <EditGiftModal gift={gift} submitEditForm={submitEditForm} 
            titleInput={titleInput}
                brandInput={brandInput}
                priceInput={priceInput}/>
            <button onClick={() => handlePurchased(gift)}>{purchaseButtonText}</button>
            <button onClick={() => handleDelete(gift)}>Delete</button>
        </div>
    )
}

export default GiftActions;



