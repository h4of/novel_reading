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
import LoadingComponent from "../components/LoadingComponent.jsx";

const ChapterPage = () => {
  const folderPath = "http://localhost:8080/data/chapters";
  const { novelName ,chapterNumber} = useParams();
  const [content, setContent] = useState("hello");
  const navigate = useNavigate();
  const [user,setUser] = useState(null);
  const [chapter,setChapter]=useState(null);
  const [novel,setNovel] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.length !== 0) {
      const userData = localStorage.getItem('user');
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
      })
      .catch((e) => console.log(e));
  },[novelName]);

  useEffect(()=>{
    if(novel === null) return;
    const chapterID ="N"+novel.id+"C" + chapterNumber.split("-")[1];
    fetch(`http://localhost:8080/chapter/find/${chapterID}`,{
      method:"GET",
    })
    .then((res)=>res.json())
    .then((data)=>{
      setChapter(data);
      setLoading(false);
    })
    .catch((e)=>console.log(e));
  },[novel,chapterNumber])


  useEffect(() => {
    if(chapter === null) return;
    fetch(`${chapter.content}`)
      .then(response => response.text())
      .then(text => setContent(text));
  }, [chapter]);

  useEffect(() => {
    window.scroll(0, 0);
  });
  const handleClickRead = (value) => {
    if(user){
      fetch(`http://localhost:8080/user/read`,{
        method:"POST",
        credentials:"include",
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          userID:user.userID,
          novelID:novel.id,
          chapterReading:value
        })
      }).then(()=>console.log("success"))
      .catch(e=> alert(e));
    }
};

  useEffect(()=>{
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (scrollPercent >= 80) {
        increaseView();
        window.removeEventListener("scroll", handleScroll); // tránh tăng nhiều lần
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  },[novel?.id])

  const increaseView = () => {
    fetch(`http://localhost:8080/novel/inc-view/${novel.id}`,{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      }
    })
    .then(res=> res.text())
    .then(res => console.log(res))
    .catch(e => console.log(e))
  }

  function nextClick() {
    navigate(`/novel/${novel.route}/chuong-${chapter.chapterNumber + 1}`);
    handleClickRead(chapter.chapterNumber+1);
  }
  function preClick() {
    navigate(`/novel/${novel.route}/chuong-${chapter.chapterNumber - 1}`);
    handleClickRead(chapter.chapterNumber-1);
  }
  if(loading) return <LoadingComponent/>
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
            Chương {chapter.chapterNumber}
          </Link>
        </div>
        <div className="chapter-link">
          <ChevronFirst
            className={chapter.chapterNumber > 1 ? "arrow" : "disable"}
            onClick={() => navigate(`/novel/${novel.route}/chuong-1`)}
          />
          <ChevronLeft
            className={chapter.chapterNumber > 1 ? "arrow" : "disable"}
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
              chapter.chapterNumber < novel.chapters.length ? "arrow" : "disable"
            }
            onClick={nextClick}
          />
          <ChevronLast
            className={
              chapter.chapterNumber < novel.chapters.length ? "arrow" : "disable"
            }
            onClick={() =>
              navigate(`/novel/${novel.route}/chuong-${novel.chapters.length}`)
            }
          />
        </div>
        <h2>{novel.name}</h2>
        <h5>
          Chương {chapter.chapterNumber} : {chapter.title}
        </h5>
        <img src="/img/bot-btn-chapter.png"></img>
        <pre>{content}</pre>
        <img src="/img/bot-btn-chapter.png"></img>
        <div className="chapter-link">
          <ChevronLeft
            className={chapter.chapterNumber > 1 ? "arrow" : "disable"}
            onClick={preClick}
          />
          <ChevronRight
            className={
              chapter.chapterNumber <= novel.chapters.length - 1
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
