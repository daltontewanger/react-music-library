import { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataContext } from "./context/DataContext";
import { SearchContext } from "./context/SearchContext";
import SearchBar from "./Components/SearchBar";
import Gallery from "./Components/Gallery";
import ArtistView from "./Components/ArtistView";
import AlbumView from "./Components/AlbumView";

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
      {message}
      <Router>
        <SearchContext.Provider
          value={{
            term: searchInput,
            handleSearch: handleSearch,
          }}
        >
          <Routes>
            <Route path="/" element={<SearchBar />} />
          </Routes>
        </SearchContext.Provider>
        <DataContext.Provider value={data}>
          <Routes>
            <Route path="/" element={<Gallery />} />
            <Route path="/album/:id" element={<AlbumView />} />
            <Route path="/artist/:id" element={<ArtistView />} />
          </Routes>
        </DataContext.Provider>
      </Router>
    </div>
  );
}

export default App;
