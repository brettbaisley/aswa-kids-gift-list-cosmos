import "./GiftGrid.css";
import GiftItem from "./GiftItem";
import GiftActions from "./GiftActions";
import { useAuthContext } from "../context/AuthContext";


const GiftGrid = ({giftList, displayType}) => { 
    const [userInfo] = useAuthContext();

    if (!giftList) return <h2>No Gifts to Display</h2>
    if (giftList.length === 0) return <h2>Loading gifts...</h2>
    
    const ul_className = displayType === 'list' ? "gifts gifts-list" : "gifts gifts-grid";


    return (
        <ul className={ul_className}>
            { giftList.map(gift => {    
                return (
                    <li key={gift._id} className="gift-grid-item">
                        <GiftItem gift={gift} />
                        {userInfo && <GiftActions gift={gift} /> }
                    </li>
                )
            })}
        </ul>
    )
}

export default GiftGrid;