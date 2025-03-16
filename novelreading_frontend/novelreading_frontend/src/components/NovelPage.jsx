import Header from "./Header";
import "./NovelPage.css";
import { Star } from "lucide-react";
import user from "/user.png";
import { useState } from "react";
import Chapter from "./ChapterComponent.jsx";

const NovelPage = () => {
  const novel_name = "tên truyện";
  const author_name = "tên tác giả";
  const genre = "the loai";
  const content =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxim";
  const stars = Array(5).fill(0);
  const [activeStar, setActiveStar] = useState(0); // điền giá trị vao db
  const handleClick = (value) => {
    setActiveStar(value);
  };
  const bigStars = Array(5).fill(0);
  const activeBigStar = 1; //giá trị được điền từ db

  return (
    <>
      <Header />
      <div className="novel-container">
        <div className="novel-img">
          <img src={user}></img>
          <button className="form-button">Đọc tiếp</button>
          <button className="form-button2">Đọc từ đầu</button>
          <div className="star-container">
            {stars.map((star, index) => {
              return (
                <span>
                  <Star
                    key={index}
                    onClick={() => handleClick(index + 1)}
                    className={activeStar > index ? "star active" : "star"}
                  />
                </span>
              );
            })}
          </div>
        </div>
        <div className="novel-text">
          <h2>{novel_name}</h2>
          <h5>{author_name}</h5>
          <div className="star-container">
            {bigStars.map((star, index) => {
              return (
                <span>
                  <Star
                    key={index}
                    className={activeBigStar > index ? "active" : ""}
                  />
                </span>
              );
            })}
          </div>
          <br />
          <h6>Thể loại : {genre}</h6>
          <span> Tóm tắt </span>
          <p>{content}</p>
        </div>
        <div className="chapter-list">
          <h2>Chương</h2>
          <Chapter />
        </div>
      </div>
    </>
  );
};

export default NovelPage;
