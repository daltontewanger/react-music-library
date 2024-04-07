import { useState, useEffect, useRef } from "react";
import SearchBar from "./Components/SearchBar";
import Gallery from "./Components/Gallery";
import { DataContext } from "./context/DataContext";
import { SearchContext } from "./context/SearchContext";

function App() {
  const [message, setMessage] = useState("Search for Music!");
  const [data, setData] = useState([]);
  const searchInput = useRef("");

  const handleSearch = async (e, term) => {
    e.preventDefault();
    const fetchData = async () => {
      const url = encodeURI(`https://itunes.apple.com/search?term=${term}`);
      document.title = `${term} Music`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (data.results.length) {
        setData(data.results);
      } else {
        setMessage("Not Found");
      }
    };
    if (term) fetchData();
  };

  return (
    <div className="App">
      <SearchContext.Provider
        value={{
          term: searchInput,
          handleSearch: handleSearch,
        }}
      >
        <SearchBar />
      </SearchContext.Provider>
      {message}
      <DataContext.Provider value={data}>
        <Gallery />
      </DataContext.Provider>
    </div>
  );
}

export default App;
