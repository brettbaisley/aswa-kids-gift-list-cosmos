import React, {useState} from "react";

const EditGift = ( {gift} ) => {
    const [shouldShow, setShouldShow] = useState(false);

    return (
        <>
        <button onClick={() => setShouldShow(true)}>Edit</button>
            {shouldShow && (
                <div className="modal-background" onClick={() => setShouldShow(false)}>
                    <div className="modal-body" onClick={e => e.stopPropagation()}>
                        <div className="flex-column">
                            <h2>Edit Item</h2>
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" id="title" value={gift.title} />

                            <label htmlFor="brand">Brand</label>
                            <input type="text" name="brand" id="brand" value={gift.brand} />

                            <label htmlFor="price">Price</label>
                            <input type="text" name="price" id="price" value={gift.price} />

                            <div className="actions">
                                <button onClick={() => setShouldShow(false)}>Cancel</button>
                                <button>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditGift;