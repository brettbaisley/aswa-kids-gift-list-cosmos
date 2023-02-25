import React, {useState} from "react";
import './GiftEdit.css';

const EditGift = ( {gift, submitEditForm, idInput, titleInput, brandInput, priceInput} ) => {
    const [shouldShow, setShouldShow] = useState(false);

    return (
        <>
        <button onClick={() => setShouldShow(true)}>Edit</button>
            {shouldShow && (
                <div className="modal-background" onClick={() => setShouldShow(false)}>
                    <div className="modal-body" onClick={e => e.stopPropagation()}>
                        <div className="flex-column">
                            <h2>Edit Item</h2>
                            <form className="flex-column" onSubmit={submitEditForm}>
                                <input ref={idInput} type="hidden" name="giftId" id="giftId" defaultValue={gift._id}/>

                                <label htmlFor="title">Title</label>
                                <input ref={titleInput} type="text" name="title" id="title" defaultValue={gift.title}/>

                                <label htmlFor="brand">Brand</label>
                                <input ref={brandInput} type="text" name="brand" id="brand" defaultValue={gift.brand} />

                                <label htmlFor="price">Price</label>
                                <input ref={priceInput} type="text" name="price" id="price" defaultValue={gift.price} />

                                <div className="actions">
                                    <button onClick={() => setShouldShow(false)}>Cancel</button>
                                    <button>Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditGift;