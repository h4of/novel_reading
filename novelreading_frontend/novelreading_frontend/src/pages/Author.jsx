import AuthorComponent from "../components/AuthorComponent.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { Authors } from "../data.js";

const Author = () => {
  return (
    <div className="container" style={{ textAlign: "center" }}>
      <Header />
      <br />
      <h2>Danh sách tác giả</h2>
      {Authors.map((author) => (
        <AuthorComponent
          author_img={author.img}
          author_name={author.name}
          author_path={author.route}
        />
      ))}
      <Footer />
    </div>
  );
};

export default Author;
