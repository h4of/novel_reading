import { useNavigate } from "react-router-dom";

const Chapter = (chapter_path, chapter_title, chapter_number) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="chapter-component"
        onClick={() => {
          navigate({ chapter_path });
        }}
      >
        Chương {chapter_number} : {chapter_title}
      </div>
    </>
  );
};

export default Chapter;
