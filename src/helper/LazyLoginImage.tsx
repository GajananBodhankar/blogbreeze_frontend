import { LazyLoadImage } from "react-lazy-load-image-component";

function LazyLoginImage() {
  return (
    <LazyLoadImage
      effect="blur"
      src="6343825.jpg"
      loading="lazy"
      className="loginImage"
    />
  );
}

export default LazyLoginImage;
