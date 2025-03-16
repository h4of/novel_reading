import "./List.css";
import NovelComponent from "../components/NovelComponent";
import user from "/user.png";
import Header from "../components/Header";

const List = () => {
  const arr = {
    story_image: "/user.png",
    story_name: "user",
  };
  const origin = [
    {
      name: "VN",
      id: "vn",
    },
    {
      name: "NN",
      id: "nn",
    },
  ];
  return (
    <>
      <Header />
      <div className="select-box">
        <input
          type="radio"
          id={origin[0].id}
          name="option"
          value={origin.name}
        ></input>
        <label htmlFor={origin[0].id}> Truyện Việt Nam</label>
        <br />
        <input
          type="radio"
          id={origin[1].id}
          name="option"
          value={origin.name}
        ></input>
        <label htmlFor={origin[1].id}> Truyện nước ngoài</label>
        <br />
        <input type="submit" value="xác nhận" />
      </div>
      <ul className="story-list">
        <li>
          <NovelComponent
            novel_image={arr.story_image}
            novel_name={arr.story_name}
          ></NovelComponent>
        </li>
        <li>
          <NovelComponent novel_image={user} novel_name="user"></NovelComponent>
        </li>
        <li>
          <NovelComponent novel_image={user} novel_name="user"></NovelComponent>
        </li>
        <li>
          <NovelComponent novel_image={user} novel_name="user"></NovelComponent>
        </li>
        <li>
          <NovelComponent novel_image={user} novel_name="user"></NovelComponent>
        </li>
        <li>
          <NovelComponent novel_image={user} novel_name="user"></NovelComponent>
        </li>
        <li>
          <NovelComponent novel_image={user} novel_name="user"></NovelComponent>
        </li>
        <li>
          <NovelComponent novel_image={user} novel_name="user"></NovelComponent>
        </li>
      </ul>
    </>
  );
};

export default List;
