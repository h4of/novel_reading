import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

const FilterBox = () => {
  const [openFilters, setOpenFilters] = useState({});
  const [selectedFilters, setSelectedFilters] = useState([]);

  const filters = {
    "Trạng Thái": [
      "Chưa bắt đầu",
      "Đã dừng",
      "Hoàn lại",
      "Đang thực hiện",
      "Hoàn thành",
      "Có Truyện Chữ",
    ],
    "Thể Loại": [
      "Anime",
      "Drama",
      "Shounen",
      "Harem",
      "Webtoons",
      "Isekai",
      "Truyện Màu",
      "Hành Động",
      "Lãng Mạn",
      "Khoa Học",
    ],
    "Sắp Xếp": [
      "Lượt xem",
      "Lượt đánh giá",
      "Lượt theo dõi",
      "Ngày Cập Nhật",
      "Truyện Mới",
    ],
  };

  const toggleDropdown = (category) => {
    setOpenFilters({ openFilters, [category]: !openFilters[category] });
  };

  const handleCheckboxChange = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [prev, filter]
    );
  };

  return (
    <div>
      {Object.entries(filters).map(([category, options]) => (
        <div key={category}>
          <button onClick={() => toggleDropdown(category)}>
            {category}
            <ChevronDown size={18} />
          </button>
          {openFilters[category] && (
            <div>
              {options.map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={selectedFilters.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
      <button>Xác nhận</button>
    </div>
  );
};

export default FilterBox;
