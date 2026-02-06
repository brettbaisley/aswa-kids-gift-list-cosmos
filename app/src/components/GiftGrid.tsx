import './GiftGrid.css';
import { useState, useEffect, useRef } from 'react';
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
  const [currentGiftList, setCurrentGiftList] = useState(giftList);
  const prevGiftListRef = useRef(giftList);
  const isInitialMount = useRef(true);

  // Handle display type changes
  useEffect(() => {
    if (displayType !== currentDisplayType) {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentDisplayType(displayType);
        
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 200);
    }
  }, [displayType, currentDisplayType]);

  // Handle gift list changes (filtering)
  useEffect(() => {
    // Skip animation on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevGiftListRef.current = giftList;
      setCurrentGiftList(giftList);
      return;
    }

    // Check if gift list actually changed
    const prevIds = prevGiftListRef.current?.map(g => g._id).sort().join(',') || '';
    const currentIds = giftList?.map(g => g._id).sort().join(',') || '';
    
    if (prevIds !== currentIds) {
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentGiftList(giftList);
        prevGiftListRef.current = giftList;
        
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 200);
    } else {
      // Update without transition if only properties changed (like purchased status)
      setCurrentGiftList(giftList);
      prevGiftListRef.current = giftList;
    }
  }, [giftList]);

  if (!currentGiftList) return <h2>No Gifts to Display</h2>;
  if (currentGiftList.length === 0) return <h2>No gifts match your filters.</h2>;

  const ulClassName = `${
    currentDisplayType === 'list' ? 'gifts gifts-list' : 'gifts gifts-grid'
  }${isTransitioning ? ' gifts--transitioning' : ''}`;

  return (
    <ul className={ulClassName}>
      {currentGiftList.map((gift) => {
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