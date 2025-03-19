import Header from "../components/Header";
import "./NovelPage.css";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Novels, Chapters } from "../data.js";
import ChapterComPonent from "../components/ChapterComponent.jsx";
import Footer from "../components/Footer.jsx";

const NovelPage = () => {
  const { novelName } = useParams();
  const novel = Novels.find((obj) => obj.route === novelName);
  if (!novel) return <>truyện không tồn tại</>;
  const navigate = useNavigate();
  useEffect(() => {
    window.scroll(0, 0);
  });

  const chapters = [];
  for (let index = 0; index < Chapters.length; index++) {
    if (Chapters[index].novel_id === novel.novel_id)
      chapters.push(Chapters[index]);
  }

  const genre = "the loai";
  const stars = Array(5).fill(0);
  const [activeStar, setActiveStar] = useState(0); // điền giá trị vao db
  const handleClick = (value) => {
    setActiveStar(value);
  };

  const bigStars = Array(5).fill(0);
  return (
    <div className="container">
      <Header />
      <div className="novel-container">
        <div className="novel-img">
          <img src={novel.img}></img>
          <button className="form-button">Đọc tiếp</button>
          <button
            className="form-button2"
            onClick={() => navigate(`/novel/${novel.route}/chuong-1`)}
          >
            Đọc từ đầu
          </button>
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
          <h2>{novel.name}</h2>
          <div className="star-container">
            {bigStars.map((star, index) => {
              return (
                <span>
                  <Star
                    key={index}
                    className={novel.rating > index ? "active" : ""}
                  />
                </span>
              );
            })}
          </div>
          <br />
          <h6>Thể loại : {genre}</h6>
          <br />
          <span> Tóm tắt </span>
          <p>{novel.anou}</p>
        </div>
        <div className="chapter-list">
          {chapters.map((chapter) => (
            <ChapterComPonent
              chapter_number={chapter.chapter_number}
              chapter_title={chapter.title}
              chapter_path={`chuong-${chapter.chapter_number}`}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NovelPage;
