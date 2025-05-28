import { useNavigate } from "react-router-dom";
import "./Header.css";

const NovelSearch = ({ novel_name, novel_img, novel_route }) => {
  const navigate = useNavigate();
  return (
    <div
      className="novel-search"
      onClick={() => {
        navigate(`/novel/${novel_route}`);
      }}
    >
      <img src={novel_img}></img>
      <h5>{novel_name}</h5>
    </div>
  );
};

export default NovelSearch;
