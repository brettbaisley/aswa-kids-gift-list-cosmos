import './GiftGrid.css';
import GiftItem from './GiftItem';
import type { Gift } from '../types/gift';

type GiftGridProps = {
  giftList?: Gift[];
  displayType?: 'grid' | 'list';
  handleUpdate: (gift: Gift) => void;
  handleDelete: (giftId: string) => void;
};

const GiftGrid = ({
  giftList,
  displayType = 'grid',
  handleUpdate,
  handleDelete
}: GiftGridProps) => {
  if (!giftList) return <h2>No Gifts to Display</h2>;
  if (giftList.length === 0) return <h2>No gifts match your filters.</h2>;

  const ulClassName = displayType === 'list' ? 'gifts gifts-list' : 'gifts gifts-grid';

  return (
    <ul className={ulClassName}>
      {giftList.map((gift) => {
        const itemClassName = `gift-grid-item ${
          displayType === 'list' ? 'gift-grid-item--list' : 'gift-grid-item--grid'
        }${gift.purchased ? ' gift-grid-item--purchased' : ''}`;

        return (
          <li key={gift._id} className={itemClassName}>
            <GiftItem gift={gift} handleUpdate={handleUpdate} handleDelete={handleDelete} />
          </li>
        );
      })}
    </ul>
  );
};

export default GiftGrid;