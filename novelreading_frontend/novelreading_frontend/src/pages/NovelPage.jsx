import Header from "../components/Header";
import "./NovelPage.css";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Novels, Chapters } from "../data.js";
import ChapterComPonent from "../components/ChapterComponent.jsx";
import Footer from "../components/Footer.jsx";
import LoadingComponent from "../components/LoadingComponent.jsx";

const NovelPage = () => {
  const folderPath = "http://localhost:8080/data/image";
  const { novelName } = useParams();
  const navigate = useNavigate();
  const [novel, setNovel] = useState([]);
  const [loading, setLoadings] = useState(true);
  const [pageSize, setPageSize] = useState(10); // Initial number of chapters to show
  // useEffect(() => {
  // window.scroll(0, 0);
  // });
  const stars = Array(5).fill(0);
  const bigStars = Array(5).fill(0);
  const [activeStar, setActiveStar] = useState(0);
  const [bigActiveStar, setBigActiveStar] = useState(0);
  const [user, setUser] = useState(null);
  const [con, setCon] = useState(null);

  const genre = {
    detective: "Trinh Thám",
    fantasy: "Viễn Tưởng",
    action: "Hành Động",
    romance: "Lãng Mạn",
    science: "Khoa Học",
    satirical: "Trào Phúng",
  };

  useEffect(() => {
    if (localStorage.length !== 0) {
      const userData = localStorage.getItem("user");
      setUser(JSON.parse(userData));
    }
  }, []);
  useEffect(() => {
    fetch(`http://localhost:8080/novel/get/${novelName}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setNovel(data);
        setLoadings(false);
      })
      .catch((e) => console.log(e));
  }, [novelName]);
  useEffect(() => {
    if (!novel) return;
    fetch(`http://localhost:8080/novel/final-rating/${novel.id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setBigActiveStar(data);
      });
  }, [novel]);

  useEffect(() => {
    if (!user || !novel) return;
    fetch(
      `http://localhost:8080/user/novel/get-rating?novelID=${novel.id}&userID=${user.userID}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setActiveStar(data);
      })
      .catch((e) => console.log(e));

    fetch(
      `http://localhost:8080/user/novel/get-reading?novelID=${novel.id}&userID=${user.userID}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCon(data);
      })
      .catch((e) => console.log(e));
  }, [user, novel]);
  const handleClickRate = (value) => {
    if (localStorage.length === 0) navigate("/login");
    else {
      setActiveStar(value);
      fetch(`http://localhost:8080/user/rating`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: user.userID,
          novelID: novel.id,
          rate: value,
        }),
      })
        .then(() => console.log("success"))
        .catch((e) => alert(e));
    }
  };
  const handleClickRead = (value) => {
    if (user) {
      fetch(`http://localhost:8080/user/read`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: user.userID,
          novelID: novel.id,
          chapterReading: value,
        }),
      })
        .then(() => console.log("success"))
        .catch((e) => alert(e));
    }
  };
  const handleLoadMore = () => {
    setPageSize((prevSize) => prevSize + 10); // Increase by 10 chapters each time
  };

  if (loading) return <LoadingComponent />;
  return (
    <div className="container">
      <Header />
      <div className="novel-container">
        <div className="novel-img">
          <img src={`${folderPath}/${novel.route}.png`}></img>
          <button
            className={
              Number.isInteger(con) ? "form-button" : "form-button disable"
            }
            onClick={() => {
              if (con) navigate(`/novel/${novel.route}/chuong-${con}`);
            }}
          >
            Đọc tiếp {con ? `# ${con}` : ""}
          </button>
          <button
            className={
              novel.chapters.length === 0
                ? "form-button2 disable"
                : "form-button2"
            }
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
                    onClick={() => handleClickRate(index + 1)}
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
                    className={bigActiveStar > index ? "active" : ""}
                  />
                </span>
              );
            })}
          </div>
          <br />
          <h6>Thể loại : {genre[novel.genre]}</h6>
          <br />
          <span> Tóm tắt </span>
          <p>{novel.anou}</p>
        </div>
        <div className="chapter-list">
          {novel.chapters.slice(0, pageSize).map((chapter) => (
            <ChapterComPonent
              key={chapter.chapterNumber}
              chapter_number={chapter.chapterNumber}
              chapter_title={chapter.title}
              chapter_path={`chuong-${chapter.chapterNumber}`}
              onClick={() => handleClickRead(chapter.chapterNumber)}
            />
          ))}
          {pageSize < novel.chapters.length && (
            <button className="load-more-button" onClick={handleLoadMore}>
              Xem thêm
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NovelPage;
