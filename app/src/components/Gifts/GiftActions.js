import React from "react";
import './GiftActions.css';
import EditGiftModal from './EditGiftModal';
import { useAuthContext } from "../../context/AuthContext";


const GiftActions = ( {gift, handlePurchased, handleDelete, submitEditForm, titleInput, brandInput, priceInput} ) => {
    const [userInfo] = useAuthContext();
    const purchaseButtonText = (!gift.purchased) ? "Purchase" : "Unpurchase";
    return (
        <div className="actions">
            {userInfo && <EditGiftModal gift={gift} submitEditForm={submitEditForm} 
            titleInput={titleInput}
                brandInput={brandInput}
                priceInput={priceInput}/>}
            {userInfo && <button onClick={() => handleDelete(gift)}>Delete</button>}
            <button onClick={() => handlePurchased(gift)}>{purchaseButtonText}</button>
        </div>
    )
}

export default GiftActions;



