import React, {useState, useEffect} from "react";
import "./Registry.css";
import FilterGifts from "./Gifts/FilterGifts";
import Gifts from "./Gifts/Gifts";

import giftsJSON from '../gift_data.json';


const Registry = () => {
    const [gifts, setGifts] = useState(null);

    useEffect(() => {
        setGifts(giftsJSON);
    },[]);
    
    return (
        <section className="wrapper">
            <FilterGifts />
            <Gifts gifts={gifts}/>
        </section>
    )
}

export default Registry;