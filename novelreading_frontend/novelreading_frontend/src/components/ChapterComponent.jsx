import { useNavigate } from "react-router-dom";

const ChapterComPonent = ({ chapter_path, chapter_title, chapter_number }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="chapter-component"
        onClick={() => {
          navigate(`${chapter_path}`);
        }}
      >
        Chương {chapter_number} : {chapter_title}
      </div>
    </>
  );
};

export default ChapterComPonent;
