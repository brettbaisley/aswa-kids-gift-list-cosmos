import { useState, useEffect, useMemo } from 'react';
import './Registry.css';
import { fetchGiftsDB, updateGiftDB } from '../services/GiftService.mjs';
import GiftFilters from './GiftFilters';
import GiftGrid from './GiftGrid';
import ToggleButtons from './ToggleButtons';
import type { Gift } from '../types/gift';

const PRICE_RANGES = [
  { id: '0-25', label: '$0 - $25', min: 0, max: 25 },
  { id: '25-50', label: '$25 - $50', min: 25, max: 50 },
  { id: '50-100', label: '$50 - $100', min: 50, max: 100 },
  { id: '100+', label: '$100+', min: 100, max: Infinity }
];

const Registry = () => {
  const [kidFilter, setKidFilter] = useState<'both' | 'mateo' | 'lucas'>('both');
  const [displayType, setDisplayType] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [hidePurchased, setHidePurchased] = useState(false);
  const [allGifts, setAllGifts] = useState<Gift[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [sliderMin, setSliderMin] = useState(0);
  const [sliderMax, setSliderMax] = useState(0);
  const [sliderActive, setSliderActive] = useState(false);

  useEffect(() => {
    fetchGiftsDB().then((gifts: Gift[]) => setAllGifts(gifts));
  }, []);

  const maxPrice = useMemo(() => {
    if (!allGifts.length) return 0;
    return Math.max(...allGifts.map((gift) => Number(gift.price) || 0));
  }, [allGifts]);

  useEffect(() => {
    if (!sliderActive) {
      setSliderMin(0);
      setSliderMax(maxPrice);
      return;
    }
    setSliderMin((prev) => Math.min(prev, maxPrice));
    setSliderMax((prev) => Math.min(prev, maxPrice));
  }, [maxPrice, sliderActive]);

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

  const handleTogglePriceRange = (rangeId: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(rangeId) ? prev.filter((id) => id !== rangeId) : [...prev, rangeId]
    );
  };

  const handleSliderMinChange = (value: number) => {
    setSliderActive(true);
    if (value > sliderMax) {
      setSliderMin(value);
      setSliderMax(value);
      return;
    }
    setSliderMin(value);
  };

  const handleSliderMaxChange = (value: number) => {
    setSliderActive(true);
    if (value < sliderMin) {
      setSliderMin(value);
      setSliderMax(value);
      return;
    }
    setSliderMax(value);
  };

  const clearSlider = () => {
    setSliderActive(false);
    setSliderMin(0);
    setSliderMax(maxPrice);
  };

  const filteredGifts = useMemo(() => {
    return allGifts.filter((gift) => {
      if (hidePurchased && gift.purchased) return false;

      const kids = gift.kids ?? [];
      if (kidFilter === 'mateo') {
        if (!kids.includes('Mateo') || kids.includes('Lucas')) return false;
      } else if (kidFilter === 'lucas') {
        if (!kids.includes('Lucas') || kids.includes('Mateo')) return false;
      }

      const price = Number(gift.price) || 0;

      if (sliderActive) {
        return price >= sliderMin && price <= sliderMax;
      }

      if (selectedPriceRanges.length > 0) {
        return selectedPriceRanges.some((rangeId) => {
          const range = PRICE_RANGES.find((entry) => entry.id === rangeId);
          if (!range) return false;
          if (range.max === Infinity) {
            return price >= range.min;
          }
          return price >= range.min && price <= range.max;
        });
      }

      return true;
    });
  }, [
    allGifts,
    hidePurchased,
    kidFilter,
    sliderActive,
    sliderMin,
    sliderMax,
    selectedPriceRanges
  ]);

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
          kidFilter={kidFilter}
          setKidFilter={setKidFilter}
          showFilters={showFilters}
          hidePurchased={hidePurchased}
          toggleHidePurchased={setHidePurchased}
          priceRanges={PRICE_RANGES}
          selectedPriceRanges={selectedPriceRanges}
          togglePriceRange={handleTogglePriceRange}
          sliderMin={sliderMin}
          sliderMax={sliderMax}
          maxPrice={maxPrice}
          sliderActive={sliderActive}
          setSliderMin={handleSliderMinChange}
          setSliderMax={handleSliderMaxChange}
          clearSlider={clearSlider}
        />

        <GiftGrid
          giftList={filteredGifts}
          displayType={displayType}
          handleUpdate={handleGiftUpdate}
        />
      </main>
    </>
  );
};

export default Registry;