import { useState, useEffect } from "react";
import SearchBar from "./Components/SearchBar";
import Gallery from "./Components/Gallery";

function App() {
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("Search for Music!");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = encodeURI(`https://itunes.apple.com/search?term=${search}`);
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      if (data.results.length) {
        setData(data.results);
      } else {
        setMessage("Not Found");
      }
    };
    if(search) fetchData();
  }, [search]);

  const handleSearch = async (e, term) => {
    e.preventDefault()
    setSearch(term)
  }

  return (
    <div className="App">
      <SearchBar handleSearch={handleSearch} />
      {message}
      <Gallery data={data}/>
    </div>
  );
}

export default App;
