import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./NovelComponent.css";

const NovelComponent = ({ novel_image, novel_name, novel_path, novel_view ,isHome}) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    navigate(`/novel/${novel_path}`);
    window.location.reload();
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div className="novel-component" onClick={handleClick}>
      <div className="novel-image-container">
        {!imageLoaded && (
          <div className="image-loading">
            <div className="loading-spinner"></div>
          </div>
        )}
        <img
          src={imageError ? "/placeholder-novel.jpg" : novel_image}
          alt={novel_name}
          className={`novel-image ${imageLoaded ? "loaded" : ""}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        <div className="novel-overlay">
          <span className="read-more">Đọc ngay</span>
        </div>
      </div>
      <p className="novel-title">{novel_name}</p>
      {isHome ===true && <p className="show-novel-view">Lượt đọc:{novel_view}</p>}
    </div>
  );
};

export default NovelComponent;
