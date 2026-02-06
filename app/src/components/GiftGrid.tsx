import './GiftGrid.css';
import { useState, useEffect } from 'react';
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentDisplayType, setCurrentDisplayType] = useState(displayType);

  useEffect(() => {
    if (displayType !== currentDisplayType) {
      setIsTransitioning(true);
      
      // Small delay to allow fade-out
      setTimeout(() => {
        setCurrentDisplayType(displayType);
        
        // Allow fade-in to complete
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 200);
    }
  }, [displayType, currentDisplayType]);

  if (!giftList) return <h2>No Gifts to Display</h2>;
  if (giftList.length === 0) return <h2>No gifts match your filters.</h2>;

  const ulClassName = `${
    currentDisplayType === 'list' ? 'gifts gifts-list' : 'gifts gifts-grid'
  }${isTransitioning ? ' gifts--transitioning' : ''}`;

  return (
    <ul className={ulClassName}>
      {giftList.map((gift) => {
        const itemClassName = `gift-grid-item ${
          currentDisplayType === 'list' ? 'gift-grid-item--list' : 'gift-grid-item--grid'
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