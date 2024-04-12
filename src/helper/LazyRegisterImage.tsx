import { LazyLoadImage } from "react-lazy-load-image-component";

function LazyRegisterImage() {
  return (
    <LazyLoadImage
      effect="blur"
      src="Data_security_05.jpg"
      className="registerImage"
      loading="lazy"
    />
  );
}

export default LazyRegisterImage;
