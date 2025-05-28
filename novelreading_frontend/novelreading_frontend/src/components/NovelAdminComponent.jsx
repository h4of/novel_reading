import { Pencil, Trash2, EyeOff, Eye, Plus } from "lucide-react";
import { useState } from "react";

const NovelAdminComponent = ({ novel_img, novel_name }) => {
  const [eyeOpen, setEyeOpen] = useState(true);
  const [tab, setTab] = useState();
  function handleClickEye() {
    if (eyeOpen === true) setEyeOpen(false);
    else setEyeOpen(true);
  }
  return (
    <div className="novel-a-component">
      <img
        src={novel_img}
        width="10%"
        height="100%"
        style={{ border: "1px solid #3427273a", borderRadius: "10px" }}
      />
      <div>
        <h3>{novel_name}</h3>
      </div>
      <div
        style={{
          position: "absolute",
          right: "0",
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          cursor: "pointer",
          gap: "10px",
        }}
      >
        <Pencil
          style={{ border: "2px solid", background: "#a5e8f9" }}
          onClick={() => {
            setTab("edit");
          }}
        />
        <Trash2
          style={{ border: "2px solid", background: "red" }}
          onClick={() => {
            setTab("delete");
          }}
        />
        <Plus
          style={{ border: "2px solid", background: "green" }}
          onClick={() => {
            setTab("add-chapter");
          }}
        />
        {/* {eyeOpen === true && (
          <Eye
            style={{ border: "2px solid", background: "gray", fill: "#fff" }}
            onClick={handleClickEye}
          />
        )}
        {eyeOpen === false && (
          <EyeOff
            style={{ border: "2px solid", background: "gray", fill: "#fff" }}
            onClick={handleClickEye}
          />
        )} */}
      </div>
      {/* <div className="">
        {tab === "edit" && (
          <div className="novel-a-component">
            <span> Chỉnh sửa truyện </span>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default NovelAdminComponent;
