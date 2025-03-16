import { useEffect, useState } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import "./ImageSlider.css";

const ImageSlider = ({ ImgURL }) => {
  const [indexImage, setIndexImage] = useState(0);
  function preSlide() {
    setIndexImage((index) => {
      if (index === 0) return ImgURL.length - 1;
      return index - 1;
    });
  }
  function nextSlide() {
    setIndexImage((index) => {
      if (index === ImgURL.length - 1) return 0;
      return index + 1;
    });
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setIndexImage(indexImage === ImgURL.length - 1 ? 0 : indexImage + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [indexImage]);
  return (
    <div className="slider-container">
      {ImgURL.map((url) => (
        <img
          src={url}
          className="img-to-img"
          style={{ translate: `${-100 * indexImage}%` }}
        ></img>
      ))}
      <a href="#"></a>
      <button style={{ left: 0 }} onClick={preSlide}>
        <ChevronsLeft />
      </button>
      <button style={{ right: "0" }} onClick={nextSlide}>
        <ChevronsRight />
      </button>
    </div>
  );
};

export default ImageSlider;
