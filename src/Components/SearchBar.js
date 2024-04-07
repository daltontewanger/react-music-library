import { useState } from "react";

function SearchBar(props) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <form onSubmit={(e) => props.handleSearch(e, searchTerm)}>
      <input onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Enter a search term here" />
      <input type="submit" />
    </form>
  );
}

export default SearchBar;
