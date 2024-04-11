import { useContext } from "react"; 
import { DataContext } from "../context/DataContext";
import GalleryItem from "./GalleryItem";

function Gallery() {
  const dataResource = useContext(DataContext);

  const renderGalleryItems = (data) => {
    return data.map((item, i) => (
      <GalleryItem key={i} item={item} />
    ));
  };

  let display;
  if (!dataResource || !dataResource.result) {
    display = <p>Pending search</p>;
  } else {
    try {
      const data = dataResource.result.read();
      display = renderGalleryItems(data);
    } catch (error) {
      throw error;
    }
  }
  return <div>{display}</div>;
}
export default Gallery;



