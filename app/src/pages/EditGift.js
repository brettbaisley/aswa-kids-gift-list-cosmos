import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { fetchGiftDB, updateGiftDB } from '../services/GiftService.mjs';
import "./EditGift.css";

const EditPage = () => {

    const [selectedKids, setSelectedKids] = useState([]);
    const kid_options = ['Mateo', 'Lucas'];

    const [gift, setGift] = useState({title: "", brand: "", price: "", kids: []});
    const [displayMsg, setDisplayMsg] = useState();
    let { id } = useParams();

    useEffect(() => {
        fetchGiftDB(id)
            .then(gift => setGift(gift))
    },[id]);

    const handleChangeInput = (e) => {
        setGift( {...gift, [e.target.name]: e.target.value });
    }

    // const handleCheckboxChange = (kid) => {
    //     let newArray = [...gift.kids, e.target.id];
    //     if (gift.kids.includes(e.target.id)) {
    //       newArray = newArray.filter(kid => kid !== e.target.id);
    //     } 
    //     setGift( {...gift, kids: newArray} );
    // };

    // TODO: Need to have checkboxes set based on Database value, right now they load empty
    const handleCheckboxChange = (kid) => {
        setSelectedKids(selectedKids => {
            if (selectedKids.includes(kid)) {
                return selectedKids.filter(k => k !== kid);
            } else {
                return [...selectedKids, kid];
            }
        });
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

            <p>Kid</p>
            <div>
                {kid_options.map(kid => (
                    <label key={kid}>{kid}
                        <input type="checkbox"
                            value={kid}
                            checked={selectedKids.includes(kid)}
                            onChange={() => handleCheckboxChange(kid)}
                        />
                    </label>
                ))}
            </div>

            <div className="form-buttons">
                <Link to="/">Back</Link>
                <button type="submit">Submit</button>
            </div>

        </form>
        </>
    );
};

export default EditPage;