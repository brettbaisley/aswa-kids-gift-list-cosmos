import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { fetchGiftDB } from '../services/GiftService.mjs';
import "./EditGift.css";

const EditPage = () => {
    const [gift, setGift] = useState("");
    let { id } = useParams();

    useEffect(() => {
        fetchGiftDB(id)
            .then(gift => setGift(gift))
    },[]);



    return (
        <>
        <h2>Edit Gift: {gift.title} </h2>

        <form>
            <label htmlFor="gid">ID</label>
            <input type="text" name="gid" id="gid" value={gift._id} disabled></input>

            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" value={gift.title}></input>
            
            <label htmlFor="brand">Brand</label>
            <input type="text" name="brand" id="brand" value={gift.brand}></input>

            <label htmlFor="price">Price</label>
            <input type="text" name="price" id="price" value={gift.price}></input>

            <div className="form-buttons">
                <button>Back</button>
                <button>Submit</button>
            </div>

        </form>
        </>
    );
};

export default EditPage;