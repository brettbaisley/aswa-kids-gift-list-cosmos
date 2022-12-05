import React from "react";


const EditGift = ( {gift} ) => {

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(`Name is ${name}, Value is ${value}`)
    }


    return (
        <div className="flex-column">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" value={gift.title} onChange={handleChange} />

            <label htmlFor="brand">Brand</label>
            <input type="text" name="brand" id="brand" value={gift.brand} onChange={handleChange} />

            <label htmlFor="price">Price</label>
            <input type="text" name="price" id="price" value={gift.price} onChange={handleChange} />

            <div className="actions">
                <button>Cancel</button>
                <button>Save</button>
            </div>
        </div>
    )
}

export default EditGift;