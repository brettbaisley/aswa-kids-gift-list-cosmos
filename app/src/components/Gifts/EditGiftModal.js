import React, {useState} from "react";

const EditGift = ( {gift, submitEditForm, titleInput, brandInput, priceInput} ) => {
    const [shouldShow, setShouldShow] = useState(false);

    return (
        <>
        <button onClick={() => setShouldShow(true)}>Edit</button>
            {shouldShow && (
                <div className="modal-background" onClick={() => setShouldShow(false)}>
                    <div className="modal-body" onClick={e => e.stopPropagation()}>
                        <div className="flex-column">
                            <h2>Edit Item</h2>
                            <form onSubmit={submitEditForm}>
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