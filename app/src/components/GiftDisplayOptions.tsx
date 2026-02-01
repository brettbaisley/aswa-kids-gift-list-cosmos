import './GiftDisplayOptions.css';

type GiftDisplayOptionsProps = {
  displayType: 'grid' | 'list';
  setDisplayType: (value: 'grid' | 'list') => void;
  sortBy: string;
  setSortBy: (value: string) => void;
};

const GiftDisplayOptions = ({
  displayType,
  setDisplayType,
  sortBy,
  setSortBy
}: GiftDisplayOptionsProps) => {
  const sortByOptions = ['Date Added', 'Price'];

  return (
    <div className="gift-display-options">
      <div>
        <button
          aria-pressed={displayType === 'grid'}
          onClick={() => setDisplayType('grid')}
        >
          <i className="fa-light fa-grid"></i>
        </button>
        <button
          aria-pressed={displayType === 'list'}
          onClick={() => setDisplayType('list')}
        >
          <i className="fa-light fa-list"></i>
        </button>
      </div>

      <div>
        <label htmlFor="sortBySelect">Sort By:</label>
        <select
          name="sortBySelect"
          id="sortBySelect"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {sortByOptions.map((value) => {
            return (
              <option key={value} value={value}>
                {value}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default GiftDisplayOptions;