import { useState, useRef, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataContext } from "./context/DataContext";
import { SearchContext } from "./context/SearchContext";
import SearchBar from "./Components/SearchBar";
import Gallery from "./Components/Gallery";
import ArtistView from "./Components/ArtistView";
import AlbumView from "./Components/AlbumView";
import { createResource as fetchData } from "./helper";

function App() {
  const [message, setMessage] = useState("Search for Music!");
  const [resource, setResource] = useState(null);
  const searchInput = useRef("");

  const handleSearch = (e, term) => {
    e.preventDefault();
    if (term) {
      setResource(fetchData(term));
    } else {
      setMessage("Please enter a search term");
    }
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
        <DataContext.Provider value={resource}>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<h1>Loading...</h1>}>
                  <Gallery />
                </Suspense>
              }
            />
            <Route path="/album/:id" element={<AlbumView />} />
            <Route path="/artist/:id" element={<ArtistView />} />
          </Routes>
        </DataContext.Provider>
      </Router>
    </div>
  );
}

export default App;
