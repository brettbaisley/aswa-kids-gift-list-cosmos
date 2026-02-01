import type { Dispatch, SetStateAction } from 'react';
import './GiftFilters.css';

type PriceRange = {
  id: string;
  label: string;
  min: number;
  max: number;
};

type GiftFiltersProps = {
  kidFilter: 'both' | 'mateo' | 'lucas';
  setKidFilter: Dispatch<SetStateAction<'both' | 'mateo' | 'lucas'>>;
  showFilters: boolean;
  hidePurchased: boolean;
  toggleHidePurchased: (value: boolean) => void;
  priceRanges: PriceRange[];
  selectedPriceRanges: string[];
  togglePriceRange: (id: string) => void;
  sliderMin: number;
  sliderMax: number;
  maxPrice: number;
  sliderActive: boolean;
  setSliderMin: (value: number) => void;
  setSliderMax: (value: number) => void;
  clearSlider: () => void;
};

const GiftFilters = ({
  kidFilter,
  setKidFilter,
  showFilters,
  hidePurchased,
  toggleHidePurchased,
  priceRanges,
  selectedPriceRanges,
  togglePriceRange,
  sliderMin,
  sliderMax,
  maxPrice,
  sliderActive,
  setSliderMin,
  setSliderMax,
  clearSlider
}: GiftFiltersProps) => {
  return (
    <div className={showFilters ? 'filters filters-expanded' : 'filters'}>
      <div className="filters__section">
        <h2>Kids</h2>
        <ul>
          <li>
            <label className="filter-option">
              <input
                type="radio"
                name="kidFilter"
                value="both"
                checked={kidFilter === 'both'}
                onChange={() => setKidFilter('both')}
              />
              <span>All Gifts</span>
            </label>
          </li>
          <li>
            <label className="filter-option">
              <input
                type="radio"
                name="kidFilter"
                value="mateo"
                checked={kidFilter === 'mateo'}
                onChange={() => setKidFilter('mateo')}
              />
              <span>Mateo Only</span>
            </label>
          </li>
          <li>
            <label className="filter-option">
              <input
                type="radio"
                name="kidFilter"
                value="lucas"
                checked={kidFilter === 'lucas'}
                onChange={() => setKidFilter('lucas')}
              />
              <span>Lucas Only</span>
            </label>
          </li>
        </ul>
      </div>

      <div className="filters__section">
        <h2>Status</h2>
        <ul>
          <li>
            <label className="filter-option">
              <input
                type="checkbox"
                id="hidepurchased"
                name="hidepurchased"
                checked={hidePurchased}
                onChange={() => toggleHidePurchased(!hidePurchased)}
              />
              <span>Hide Purchased</span>
            </label>
          </li>
        </ul>
      </div>

      <div className="filters__section">
        <h2>Price</h2>
        <ul className="filters__ranges">
          {priceRanges.map((range) => (
            <li key={range.id}>
              <label className="filter-option">
                <input
                  type="checkbox"
                  disabled={sliderActive}
                  checked={selectedPriceRanges.includes(range.id)}
                  onChange={() => togglePriceRange(range.id)}
                />
                <span>{range.label}</span>
              </label>
            </li>
          ))}
        </ul>

        <div className="filters__slider">
          <div className="filters__slider-header">
            <h3>Custom Range</h3>
            {sliderActive && (
              <button type="button" className="filters__clear" onClick={clearSlider}>
                Clear
              </button>
            )}
          </div>
          <div className="filters__slider-row">
            <label htmlFor="minPrice">Min: ${sliderMin}</label>
            <input
              type="range"
              id="minPrice"
              min={0}
              max={maxPrice}
              step={1}
              value={sliderMin}
              onChange={(e) => setSliderMin(Number(e.target.value))}
            />
          </div>
          <div className="filters__slider-row">
            <label htmlFor="maxPrice">Max: ${sliderMax}</label>
            <input
              type="range"
              id="maxPrice"
              min={0}
              max={maxPrice}
              step={1}
              value={sliderMax}
              onChange={(e) => setSliderMax(Number(e.target.value))}
            />
          </div>
          <p className="filters__hint">When set, custom range overrides default ranges.</p>
        </div>
      </div>
    </div>
  );
};

export default GiftFilters;