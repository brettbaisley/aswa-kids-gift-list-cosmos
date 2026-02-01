import './GiftGrid.css';
import GiftItem from './GiftItem';
import type { Gift } from '../types/gift';

type GiftGridProps = {
  giftList?: Gift[];
  displayType?: 'grid' | 'list';
  filterKids: string[];
  hidePurchased: boolean;
  handleUpdate: (gift: Gift) => void;
};

const GiftGrid = ({
  giftList,
  displayType = 'grid',
  filterKids,
  hidePurchased,
  handleUpdate
}: GiftGridProps) => {
  if (!giftList) return <h2>No Gifts to Display</h2>;
  if (giftList.length === 0) return <h2>Loading gifts...</h2>;

  const ulClassName = displayType === 'list' ? 'gifts gifts-list' : 'gifts gifts-grid';

  return (
    <ul className={ulClassName}>
      {giftList
        .filter((gift) => {
          if (hidePurchased && filterKids.length > 0) {
            return !gift.purchased && gift.kids.some((kid) => filterKids.includes(kid));
          } else if (hidePurchased) {
            return !gift.purchased;
          } else if (filterKids.length > 0) {
            return gift.kids.some((kid) => filterKids.includes(kid));
          }
          return true;
        })
        .map((gift) => {
          return (
            <li key={gift._id} className="gift-grid-item">
              <GiftItem gift={gift} handleUpdate={handleUpdate} />
            </li>
          );
        })}
    </ul>
  );
};

export default GiftGrid;