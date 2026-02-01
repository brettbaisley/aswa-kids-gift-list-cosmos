import type { Gift } from '../../types/gift';

type GiftProps = {
  gift: Gift;
};

const GiftComponent = ({ gift }: GiftProps) => {
  return (
    <div>
      {gift.imageUrl ? (
        <img className="gift-image" src={gift.imageUrl} alt={gift.title} loading="lazy" />
      ) : (
        <div className="gift-image gift-image--placeholder">No image</div>
      )}
      <div className="gift-title">{gift.title}</div>
      <div className="gift-brand">{gift.brand}</div>
      <div className="gift-price">${gift.price}</div>
    </div>
  );
};

export default GiftComponent;