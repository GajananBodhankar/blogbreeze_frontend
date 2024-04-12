import { LazyLoadImage } from "react-lazy-load-image-component";

function LazyHomeImage() {
  return (
    <LazyLoadImage
      effect="blur"
      src="5174551.jpg"
      alt="Image not found"
      loading="lazy"
      className="homeImage"
    />
  );
}

export default LazyHomeImage;
