import "./Home.css";
import Header from "../components/Header";
import Footer from "../components/Footer.jsx";
import ImageSlider from "../components/ImageSlider";
import NovelComponent from "../components/NovelComponent.jsx";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useEffect, useState } from "react";

const Home = () => {
  const imgURL = [
    {
      img: "/img/con-cho-cua-dong-ho-baskerville-s.png",
      route: "con-cho-cua-dong-ho-baskerville",
    },
    {
      img: "/img/tat-den-s.png",
      route: "tat-den",
    },
    {
      img: "/img/tower-of-god-s.png",
      route: "tower-of-god",
    },
    {
      img: "/img/tam-quoc-dien-nghia-s.png",
      route: "tam-quoc-dien-nghia",
    },
  ];
  const imgPath = "http://localhost:8080/data/image";

  const itemPerPage = 12;

  const [novelsUpdated, setNovelsUpdated] = useState([]);
  const [novelsHighRating, setNovelsHighRating] = useState([]);
  const [novelsHighView, setNovelsHighView] = useState([]);

  const [totalPageUpdated, setTotalPageUpdated] = useState(0);
  const [totalPageHighRating, setTotalPageHighRating] = useState(0);
  const [totalPageHighView, setTotalPageHighView] = useState(0);

  const [currentPageUpdated, setCurrentPageUpdated] = useState(0);
  const [currentPageHighView, setCurrentPageHighView] = useState(0);
  const [currentPageHighRating, setCurrentPageHighRating] = useState(0);

  useEffect(() => {
    fetch(
      `http://localhost:8080/novel/updated-novel?page=${currentPageUpdated}&size=${itemPerPage}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setNovelsUpdated(res.content);
        setTotalPageUpdated(res.totalPages);
      });
  }, [currentPageUpdated]);

  useEffect(() => {
    fetch(
      `http://localhost:8080/novel/rating-novel?page=${currentPageHighRating}&size=${itemPerPage}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setNovelsHighRating(res.content);
        setTotalPageHighRating(res.totalPages);
      });
  }, [currentPageHighRating]);

  useEffect(() => {
    fetch(
      `http://localhost:8080/novel/high-view-novel?page=${currentPageHighView}&size=${itemPerPage}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setNovelsHighView(res.content);
        setTotalPageHighView(res.totalPages);
      });
  }, [currentPageHighView]);

  return (
    <div className="home-container">
      <Header />
      <div className="hero-section">
        <ImageSlider ImgURL={imgURL} />
      </div>

      <div className="content-section">
        {/* Truyện mới cập nhật */}
        <div className="novel-section">
          <div className="section-header">
            <h2>Truyện mới cập nhật</h2>
            <div className="section-nav">
              <button
                onClick={(e) => {
                  setCurrentPageUpdated((index) => index - 1);
                  e.preventDefault();
                }}
                disabled={currentPageUpdated === 0}
                className="nav-button"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={(e) => {
                  setCurrentPageUpdated((index) => index + 1);
                  e.preventDefault();
                }}
                disabled={currentPageUpdated >= totalPageUpdated - 1}
                className="nav-button"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
          <div className="novel-grid">
            {novelsUpdated.map((novel) => (
              <NovelComponent
                key={novel.id}
                novel_image={imgPath + `/${novel.route}.png`}
                novel_name={novel.name}
                novel_path={novel.route}
                novel_view={novel.view}
                isHome={true}
              />
            ))}
          </div>
        </div>
        {/* Truyện được đánh giá cao */}
        <div className="novel-section">
          <div className="section-header">
            <div className="section-title">
              <Star className="star-icon" />
              <h2>Truyện được đánh giá cao</h2>
            </div>
            <div className="section-nav">
              <button
                onClick={(e) => {
                  setCurrentPageHighRating((index) => index - 1);
                  e.preventDefault();
                }}
                disabled={currentPageHighRating === 0}
                className="nav-button"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={(e) => {
                  setCurrentPageHighRating((index) => index + 1);
                  e.preventDefault();
                }}
                disabled={currentPageHighRating >= totalPageHighRating - 1}
                className="nav-button"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
          <div className="novel-grid">
            {novelsHighRating.map((novel) => (
              <NovelComponent
                key={novel.id}
                novel_image={imgPath + `/${novel.route}.png`}
                novel_name={novel.name}
                novel_path={novel.route}
                novel_view={novel.view}
                isHome={true}
              />
            ))}
          </div>
        </div>
        {/* Truyện có lượng xem cao */}
        <div className="novel-section">
          <div className="section-header">
            <h2>Truyện có lượt đọc cao</h2>
            <div className="section-nav">
              <button
                onClick={(e) => {
                  setCurrentPageHighView((index) => index - 1);
                  e.preventDefault();
                }}
                disabled={currentPageHighView === 0}
                className="nav-button"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={(e) => {
                  setCurrentPageHighView((index) => index + 1);
                  e.preventDefault();
                }}
                disabled={currentPageHighView >= totalPageHighView - 1}
                className="nav-button"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
          <div className="novel-grid">
            {novelsHighView.map((novel) => (
              <NovelComponent
                key={novel.id}
                novel_image={imgPath + `/${novel.route}.png`}
                novel_name={novel.name}
                novel_path={novel.route}
                novel_view={novel.view}
                isHome={true}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
