import Header from "../components/Header.jsx";
import "./AuthorPage.css";
import NovelComponent from "../components/NovelComponent.jsx";
import { Authors, Novels } from "../data.js";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer.jsx";

const AuthorPage = () => {
  const { authorName } = useParams();
  const author = Authors.find((obj) => obj.route === authorName);
  const novels = [];
  for (let index = 0; index < author.indite.length; index++) {
    let novel = Novels.find((obj) => obj.novel_id === author.indite[index]);
    novels.push(novel);
  }
  return (
    <>
      <Header />
      <div className="author-container">
        <img src={author.img}></img>
        <div className="author-text">
          <h2>{author.name}</h2>
          <h4>Giới thiệu</h4>
          <p>{author.anou}</p>
        </div>
      </div>
      <div className="novel-of-author">
        <h2>Tác phẩm nổi bật</h2>
        <ul>
          {novels.map((novel) => (
            <li>
              <NovelComponent
                novel_image={novel.img}
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
