/* eslint-disable react/prop-types */
const FilterBar = ({ onFilter }) => {
  const handleFilter = (e) => {
    onFilter(e.target.value);
  };

  return (
    <div className="filter-bar">
      <select onChange={handleFilter}>
        <option value="All">All Categories</option>
        <option value="Music">Music</option>
        <option value="Art">Art</option>
        <option value="Technology">Technology</option>
        <option value="Food">Food</option>
        <option value="Fitness">Fitness</option>
        <option value="Photography">Photography</option>
        <option value="Comedy">Comedy</option>
      </select>
    </div>
  );
};

export default FilterBar;
