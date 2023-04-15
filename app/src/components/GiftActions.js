import { Link } from "react-router-dom";

const GiftActions = ( {gift})  => { 
    return (
        <div className="gift-actions">
            <Link to={`/admin/edit/${gift._id}`}>Edit</Link>
            <button>Delete</button>
        </div>
    )
}

export default GiftActions;