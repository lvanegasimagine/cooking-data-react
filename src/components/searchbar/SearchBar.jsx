import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = () => {
  const [term, setTerm] = useState('');
  const history = useHistory();

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/search?q=${term}`)

  };
  
  return (
    <div className="searchbar">
      <form onSubmit={handleSearch}>
        <input type="text" id="search" placeholder="Search..." onChange={(e) => setTerm(e.target.value)} required/>
      </form>
    </div>
  );
};

export default SearchBar;
