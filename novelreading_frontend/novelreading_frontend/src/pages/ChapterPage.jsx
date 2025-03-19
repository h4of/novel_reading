import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import "./ChapterPage.css";
import { Novels, Chapters } from "../data.js";
import {
  AlignJustify,
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Footer from "../components/Footer.jsx";
import { useEffect, useState } from "react";

const ChapterPage = () => {
  const { chapterNumber, novelName } = useParams();
  const [content, setContent] = useState("hello");
  const navigate = useNavigate();
  const novel = Novels.find((obj) => obj.route === novelName);

  const chapters = [];
  for (let index = 0; index < Chapters.length; index++) {
    if (Chapters[index].novel_id === novel.novel_id)
      chapters.push(Chapters[index]);
  }

  const chapter = chapters.find(
    (obj) => `chuong-${obj.chapter_number}` === chapterNumber
  );
  useEffect(() => {
    fetch(`${chapter.content}`)
      .then((res) => res.text())
      .then((data) => setContent(data))
      .catch((error) => console.error("error!", error));
  });

  function nextClick() {
    navigate(`/novel/${novel.route}/chuong-${chapter.chapter_number + 1}`);
  }
  function preClick() {
    navigate(`/novel/${novel.route}/chuong-${chapter.chapter_number - 1}`);
  }
  return (
    <div className="container">
      <Header />
      <div className="chapter-container">
        <div className="chapter-link">
          <Link to="/home" className="txt" reloadDocument>
            Trang Chủ
            <ChevronRight size={15} />
          </Link>
          <Link to={`/novel/${novel.route}`} className="txt" reloadDocument>
            {novel.name}
            <ChevronRight size={15} />
          </Link>
          <Link to="" className="txt">
            Chương {chapter.chapter_number}
          </Link>
        </div>
        <div className="chapter-link">
          <ChevronFirst
            className={chapter.chapter_number > 1 ? "arrow" : "disable"}
            onClick={() => navigate(`/novel/${novel.route}/chuong-1`)}
          />
          <ChevronLeft
            className={chapter.chapter_number > 1 ? "arrow" : "disable"}
            onClick={preClick}
          />
          <AlignJustify
            className="arrow"
            onClick={() => {
              navigate(`/novel/${novel.route}`);
            }}
          />
          <ChevronRight
            className={
              chapter.chapter_number < chapters.length ? "arrow" : "disable"
            }
            onClick={nextClick}
          />
          <ChevronLast
            className={
              chapter.chapter_number < chapters.length ? "arrow" : "disable"
            }
            onClick={() =>
              navigate(`/novel/${novel.route}/chuong-${chapters.length}`)
            }
          />
        </div>
        <h2>{novel.name}</h2>
        <h5>
          Chương {chapter.chapter_number} : {chapter.title}
        </h5>
        <img src="/img/bot-btn-chapter.png"></img>
        <pre>{content}</pre>
        <img src="/img/bot-btn-chapter.png"></img>
        <div className="chapter-link">
          <ChevronLeft
            className={chapter.chapter_number > 1 ? "arrow" : "disable"}
            onClick={preClick}
          />
          <ChevronRight
            className={
              chapter.chapter_number <= chapters.length - 1
                ? "arrow"
                : "disable"
            }
            onClick={nextClick}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChapterPage;
