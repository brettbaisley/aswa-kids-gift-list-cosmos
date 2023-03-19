import './GiftItem.css';

const GiftItem = ( {gift} ) => {
    return (
        <>
            <p className="title">{gift.title}</p>
            <p className="brand">{gift.brand}</p>
            <p className="price">${gift.price}</p>
        </>  
    )
}

export default GiftItem;