import { useNavigate } from "react-router-dom";

const NovelComponent = ({ novel_image, novel_name }) => {
  const navigate = useNavigate();
  return (
    <div
      className="novel-component"
      onClick={() => {
        navigate("");
      }}
    >
      <img
        src={novel_image}
        width="100%"
        height="80%"
        style={{ border: "1px solid #3427273a", borderRadius: "2px" }}
      ></img>
      <p className="story-name">{novel_name}</p>
    </div>
  );
};

export default NovelComponent;
