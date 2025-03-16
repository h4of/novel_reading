import AuthorComponent from "../components/AuthorComponent";
import Header from "../components/Header";
import user from "/user.png";

const Author = () => {
  const author_name = "Name"; ////từ db
  return (
    <div style={{ textAlign: "center" }}>
      <Header />
      <br />
      <h2>Danh sách tác giả</h2>
      <AuthorComponent author_img={user} author_name={author_name} />
    </div>
  );
};

export default Author;
