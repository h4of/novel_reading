import Header from "../components/Header.jsx";
import "./AuthorPage.css";
import NovelComponent from "../components/NovelComponent.jsx";
import { Authors, Novels } from "../data.js";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import { useEffect, useState } from "react";
import removeTypeLanguage from "../utils/FormName.js";
import LoadingComponent from "../components/LoadingComponent.jsx";

const AuthorPage = () => {
  const folderPath = "http://localhost:8080/data/image";
  const { authorName } = useParams();
  const [author, setAuthor] = useState(null);
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`http://localhost:8080/author/get/${authorName}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setAuthor(data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [authorName]);

  if (loading) return <LoadingComponent />;
  return (
    <>
      <Header />
      <div className="author-container">
        <img src={`${folderPath}/${author.route}.png`}></img>
        <div className="author-text">
          <h2>{author.name}</h2>
          <h4>Giới thiệu</h4>
          <p>{author.anou}</p>
        </div>
      </div>
      <div className="novel-of-author">
        <h2>Tác phẩm nổi bật</h2>
        <ul>
          {author.novels.map((novel) => (
            <li>
              <NovelComponent
                novel_image={`${folderPath}/${novel.route}.png`}
                novel_name={novel.name}
                novel_path={novel.route}
              />
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default AuthorPage;
