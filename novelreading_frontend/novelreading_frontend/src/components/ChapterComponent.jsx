import { useNavigate } from "react-router-dom";

const ChapterComPonent = ({ chapter_path, chapter_title, chapter_number, onClick}) => {
  const navigate = useNavigate();
  const handleClick = () =>{
    navigate(`${chapter_path}`);
    if(onClick){
      onClick();
    }
  }
  return (
    <>
      <div
        className="chapter-component"
        onClick={handleClick}
      >
        Chương {chapter_number} : {chapter_title}
      </div>
    </>
  );
};

export default ChapterComPonent;
