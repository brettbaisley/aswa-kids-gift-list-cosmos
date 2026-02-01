import { useState, useEffect } from 'react';
import './Registry.css';
import { fetchGiftsDB, updateGiftDB } from '../services/GiftService.mjs';
import GiftFilters from './GiftFilters';
import GiftGrid from './GiftGrid';
import ToggleButtons from './ToggleButtons';
import type { Gift } from '../types/gift';

const Registry = () => {
  const [filterKids, setFilterKids] = useState<string[]>(['Mateo', 'Lucas']);
  const [displayType, setDisplayType] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [hidePurchased, setHidePurchased] = useState(false);
  const [allGifts, setAllGifts] = useState<Gift[]>([]);

  useEffect(() => {
    fetchGiftsDB().then((gifts: Gift[]) => setAllGifts(gifts));
  }, []);

  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  const handleDisplayTypeToggle = () => {
    if (displayType === 'grid') {
      setDisplayType('list');
    } else {
      setDisplayType('grid');
    }
  };

  const handleGiftUpdate = (updatedGift: Gift) => {
    const newGifts = allGifts.map((gift) => {
      if (gift._id === updatedGift._id) {
        return updatedGift;
      }
      return gift;
    });

    updateGiftDB(updatedGift._id, updatedGift);
    setAllGifts(newGifts);
  };

  return (
    <>
      <ToggleButtons
        showFilters={showFilters}
        handleFilterToggle={handleFilterToggle}
        displayType={displayType}
        handleDisplayTypeToggle={handleDisplayTypeToggle}
      />
      <main className="registry">
        <GiftFilters
          filterKids={filterKids}
          showFilters={showFilters}
          setFilterKids={setFilterKids}
          hidePurchased={hidePurchased}
          toggleHidePurchased={setHidePurchased}
        />

        <GiftGrid
          giftList={allGifts}
          displayType={displayType}
          hidePurchased={hidePurchased}
          filterKids={filterKids}
          handleUpdate={handleGiftUpdate}
        />
      </main>
    </>
  );
};

export default Registry;