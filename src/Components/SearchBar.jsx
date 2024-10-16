/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Import the search icon from React Icons

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search events by title"
        value={searchTerm}
        onChange={handleSearch}
      />
      <FaSearch className="search-icon" />
    </div>
  );
};

export default SearchBar;
