import './ToggleButtons.css';

type ToggleButtonsProps = {
  showFilters: boolean;
  handleFilterToggle: () => void;
  displayType: 'grid' | 'list';
  handleDisplayTypeToggle: () => void;
};

const ToggleButtons = ({
  showFilters,
  handleFilterToggle,
  displayType,
  handleDisplayTypeToggle
}: ToggleButtonsProps) => {
  return (
    <div className="toggleButtons">
      <button
        id="toggleFilter"
        className={showFilters ? 'toggleButton toggleFilter is-active' : 'toggleButton toggleFilter'}
        onClick={handleFilterToggle}
      >
        <i className={showFilters ? 'fa-light fa-filter-slash' : 'fa-light fa-filter'}></i>
        <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
      </button>
      <button
        id="toggleGrid"
        className={displayType === 'grid' ? 'toggleButton toggleGrid' : 'toggleButton toggleGrid is-active'}
        onClick={handleDisplayTypeToggle}
      >
        <i className={displayType === 'grid' ? 'fa-light fa-list' : 'fa-light fa-grid'}></i>
        <span>{displayType === 'grid' ? 'List View' : 'Grid View'}</span>
      </button>
    </div>
  );
};

export default ToggleButtons;