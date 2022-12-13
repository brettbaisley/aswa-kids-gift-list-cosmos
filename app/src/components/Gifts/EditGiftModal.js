import React, {useState, useRef} from "react";

const EditGift = ( {gift} ) => {
    const [shouldShow, setShouldShow] = useState(false);
    const title = useRef("");
    const brand = useRef("");
    const price = useRef("");
    return (
        <>
        <button onClick={() => setShouldShow(true)}>Edit</button>
            {shouldShow && (
                <div className="modal-background" onClick={() => setShouldShow(false)}>
                    <div className="modal-body" onClick={e => e.stopPropagation()}>
                        <div className="flex-column">
                            <h2>Edit Item</h2>
                            <form onSubmit={submitForm}>
                                <label htmlFor="title">Title</label>
                                <input ref={title} type="text" name="title" id="title" defaultValue={gift.title}/>

                                <label htmlFor="brand">Brand</label>
                                <input ref={brand} type="text" name="brand" id="brand" defaultValue={gift.brand} />

                                <label htmlFor="price">Price</label>
                                <input ref={price} type="text" name="price" id="price" defaultValue={gift.price} />

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