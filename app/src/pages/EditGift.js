import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { fetchGiftDB, updateGiftDB } from '../services/GiftService.mjs';
import "./EditGift.css";

const EditPage = () => {
    const [gift, setGift] = useState({title: "", brand: "", price: ""});
    const [displayMsg, setDisplayMsg] = useState();
    let { id } = useParams();

    useEffect(() => {
        fetchGiftDB(id)
            .then(gift => setGift(gift))
    },[id]);

    const handleChangeInput = (e) => {
        setGift( {...gift, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submit form");
        const updatedGift = await updateGiftDB(gift._id, gift);
        updatedGift ? setDisplayMsg({type: 'success', message: 'Successfully updated gift.'}) : setDisplayMsg({type: 'error', message: 'Error in updating gift.'}) 
        console.log(`Got Back: ${updatedGift}`)
    }



    return (
        <>
        <h2>Edit Gift: {gift.title} </h2>

        <form onSubmit={handleSubmit}>
            <p>ID: {gift._id}</p>

            { displayMsg && <p className={displayMsg.type}>{displayMsg.message}</p> }

            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" value={gift.title} onChange={handleChangeInput}></input>
            
            <label htmlFor="brand">Brand</label>
            <input type="text" name="brand" id="brand" value={gift.brand} onChange={handleChangeInput}></input>

            <label htmlFor="price">Price</label>
            <input type="text" name="price" id="price" value={gift.price} onChange={handleChangeInput}></input>

            <div className="form-buttons">
                <Link to="/">Back</Link>
                <button type="submit">Submit</button>
            </div>

        </form>
        </>
    );
};

export default EditPage;