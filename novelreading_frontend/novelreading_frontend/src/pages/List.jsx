import "./List.css";
import NovelComponent from "../components/NovelComponent.jsx";
import Header from "../components/Header.jsx";
import { Novels } from "../data.js";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import Footer from "../components/Footer.jsx";

const List = () => {
  const [openFilters, setOpenFilters] = useState({});
  const [arrowIndex, setArrowIndex] = useState(0);
  let arrow = [<ChevronDown size={16} />, <ChevronUp size={16} />];
  const filters = {
    "Trạng Thái": ["Đã dừng", "Đang thực hiện", "Hoàn thành"],
    "Thể Loại": ["Drama", "Shounen", "Hành Động", "Lãng Mạn", "Khoa Học"],
    "Nguồn gốc": ["Truyện Việt Nam", "Truyện nước ngoài"],
  };
  const clickDropdown = (type) => {
    setOpenFilters({ ...openFilters, [type]: !openFilters[type] });
    setArrowIndex((index) => (index + 1) % 2);
  };
  return (
    <div className="container">
      <Header />
      <div className="select-box">
        {Object.entries(filters).map(([type, options]) => (
          <div className="box">
            <span onClick={() => clickDropdown(type)}>
              {type}
              {arrow[arrowIndex]}
            </span>
            {openFilters[type] && (
              <div>
                {options.map((option) => (
                  <label>
                    <input type="checkbox" className="input-checkbox" />
                    {option}
                  </label>
                ))}
              </div>
            )}
            <br />
          </div>
        ))}
        <button className="custom-button">xác nhận</button>
      </div>
      <ul className="story-list">
        {Novels.map((novel) => (
          <li>
            <NovelComponent
              novel_image={novel.img}
              novel_name={novel.name}
              novel_path={novel.route}
            />
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default List;
