import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function ArtistView() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [artistData, setArtistData] = useState([]);
  const justAlbums = artistData.filter(
    (entry) => entry.collectionType === "Album"
  );

  useEffect(() => {
    const API_URL = `http://localhost:4000/album/${id}`;
    const fetchData = async () => {
      const response = await fetch(API_URL);
      const resData = await response.json();
      console.log(resData)
      setArtistData(resData.results);
    };
    fetchData();
  }, [id]);

  const navButtons = () => {
    return (
        <div>
            <button onClick={() => navigate(-1)}>Back</button>
            |
            <button onClick={() => navigate('/')}>Home</button>
        </div>
    )
}

  const renderAlbums = justAlbums.map((album, i) => {
    return (
      <div key={i}>
        <Link to={`/album/${album.collectionId}`}>
          <p>{album.collectionName}</p>
        </Link>
      </div>
    );
  });

  return (
    <div>
      {/* <h2>The id passed was: {id}</h2> */}
      {artistData.length > 0 ? <h2>{artistData[0].artistName}</h2> : <h2>Loading...</h2>}
      {navButtons()}
      {renderAlbums}
    </div>
  );
}

export default ArtistView;
