import "./List.css";
import Story from "../components/Novel";
import user from "../assets/images/user.png";
import Header from "../components/Header";

const List = () => {
  const arr = {
    story_image: "/user.png",
    story_name: "user",
  };
  return (
    <div className="container">
      <Header />
      <ul className="story-list">
        <li>
          <Story
            story_image={arr.story_image}
            story_name={arr.story_name}
          ></Story>
        </li>
        <li>
          <Story story_image={user} story_name="user"></Story>
        </li>
        <li>
          <Story story_image={user} story_name="user"></Story>
        </li>
        <li>
          <Story story_image={user} story_name="user"></Story>
        </li>
        <li>
          <Story story_image={user} story_name="user"></Story>
        </li>
        <li>
          <Story story_image={user} story_name="user"></Story>
        </li>
        <li>
          <Story story_image={user} story_name="user"></Story>
        </li>
        <li>
          <Story story_image={user} story_name="user"></Story>
        </li>
      </ul>
    </div>
  );
};

export default List;
