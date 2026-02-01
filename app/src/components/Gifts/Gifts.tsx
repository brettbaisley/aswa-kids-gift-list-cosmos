import './Gifts.css';
import type { Gift } from '../../types/gift';

type GiftsProps = {
  gifts?: Gift[];
  hidePurchased: boolean;
  showChild: string;
};

const Gifts = ({ gifts, hidePurchased, showChild }: GiftsProps) => {
  if (!gifts) return <p>No Gifts to Display.</p>;

  return (
    <ul className="gift-list">
      {gifts.map((gift) => {
        const purchasedClass = gift.purchased ? 'gift purchased' : 'gift';

        if (hidePurchased && gift.purchased) {
          return null;
        }
        if (showChild !== 'All' && !gift.kids.includes(showChild)) {
          return null;
        }

        return (
          <li key={gift._id} className={purchasedClass}>
            <div>
              <div className="gift-title">{gift.title}</div>
              <div className="gift-brand">{gift.brand}</div>
              <div className="gift-price">${gift.price}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Gifts;