import type { Gift } from '../../types/gift';

type GiftProps = {
  gift: Gift;
};

const GiftComponent = ({ gift }: GiftProps) => {
  return (
    <div>
      <div className="gift-title">{gift.title}</div>
      <div className="gift-brand">{gift.brand}</div>
      <div className="gift-price">${gift.price}</div>
    </div>
  );
};

export default GiftComponent;