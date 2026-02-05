import './ToggleButtons.css';

import Gridsvg from '../assets/icons/grid.svg?react';
import Listsvg from '../assets/icons/list.svg?react';

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
        {displayType === 'grid' ? <Listsvg className="icon" aria-hidden="true" /> : <Gridsvg className="icon" aria-hidden="true" />}
        <span>{displayType === 'grid' ? 'List View' : 'Grid View'}</span>
      </button>
    </div>
  );
};

export default ToggleButtons;