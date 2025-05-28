import "./List.css";
import NovelComponent from "../components/NovelComponent.jsx";
import Header from "../components/Header.jsx";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import Footer from "../components/Footer.jsx";

const List = () => {
  const imgPath = "http://localhost:8080/data/image";

  const [openFilters, setOpenFilters] = useState([]);
  const [arrowIndex, setArrowIndex] = useState(0);
  const [novels, setNovels] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [genre, setGenre] = useState(null);
  const [status, setStatus] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    "Trạng Thái": "",
    "Thể Loại": "",
  });

  let arrow = [<ChevronDown size={16} />, <ChevronUp size={16} />];
  const filters = {
    "Trạng Thái": [
      { key: "stopped", value: "Đã dừng" },
      { key: "ongoing", value: "Đang thực hiện" },
      { key: "complete", value: "Hoàn thành" },
    ],
    "Thể Loại": [
      { key: "detective", value: "Trinh Thám" },
      { key: "fantasy", value: "Viễn Tưởng" },
      { key: "action", value: "Hành Động" },
      { key: "romance", value: "Lãng Mạn" },
      { key: "science", value: "Khoa Học" },
      { key: "satirical", value: "Trào Phúng" },
      { key: "historical-fantasy", value: "Kỳ Ảo Lịch Sử" },
    ],
  };

  useEffect(() => {
    fetch(`http://localhost:8080/novel/getAll?page=${currentPage}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setNovels(data.content);
        setTotalPages(data.totalPages);
      });
  }, [currentPage]);

  const clickDropdown = (type) => {
    setOpenFilters({ ...openFilters, [type]: !openFilters[type] });
    setArrowIndex((index) => (index + 1) % 2);
  };

  const handleFilterChange = (type, option) => {
    if (type === "Thể Loại") setGenre(option.key);
    else setStatus(option.key);

    setSelectedFilters((prev) => ({
      ...prev,
      [type]: option.key,
    }));
  };

  const handleConfirm = () => {
    fetch(
      `http://localhost:8080/novel/filter?genre=${genre}&status=${status}&page=${currentPage}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setNovels(data.content);
        setTotalPages(data.totalPages);
      })
      .catch((e) => console.log(e));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container">
      <Header />
      <div className="select-box">
        {Object.entries(filters).map(([type, options]) => (
          <div className="box" key={type}>
            <span onClick={() => clickDropdown(type)}>
              {type}
              {arrow[arrowIndex]}
            </span>
            {openFilters[type] && (
              <div>
                {options.map((option) => (
                  <label key={option.key}>
                    <input
                      type="radio"
                      name={type}
                      value={option.key}
                      checked={selectedFilters[type] === option.key}
                      onChange={() => handleFilterChange(type, option)}
                      className="input-radio"
                    />
                    {option.value}
                  </label>
                ))}
              </div>
            )}
            <br />
          </div>
        ))}
        <button className="custom-button" onClick={handleConfirm}>
          xác nhận
        </button>
      </div>
      <ul className="story-list">
        {novels.map((novel) => (
          <li key={novel.novel_id}>
            <NovelComponent
              novel_image={imgPath + `/${novel.route}.png`}
              novel_name={novel.name}
              novel_path={novel.route}
            />
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button
          className="page-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 0}
        >
          Trước
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`page-button ${
              currentPage === index + 1 ? "active" : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="page-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
        >
          Sau
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default List;
