import { useNavigate } from "react-router-dom";

const AuthorComponent = ({ author_img, author_name }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="author-component"
        onClick={() => {
          navigate("");
        }}
      >
        <img
          src={author_img}
          style={{
            border: "2px solid #C7C8CC",
            borderRadius: "50%",
            margin: "5px",
            height: "90%",
          }}
        ></img>
        {author_name}
      </div>
    </>
  );
};

export default AuthorComponent;
