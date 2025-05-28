import { Link } from "react-router-dom";
import "./Header.css";
import NavbarLink from "./NavbarLink.jsx";
import { useState } from "react";
import { X } from "lucide-react";
import NovelSearch from "./NovelSearch.jsx";
import { Novels } from "../data.js";
import { useEffect } from "react";

const Header = () => {
  const folderPath = "http://localhost:8080/data/image";
  const [openSearch, setOpenSearch] = useState(false);
  const [user, setUser] = useState();
  const [searchText, setSearchText] = useState("");
  const [linkUser, setLinkUser] = useState("/login");
  const [novels, setNovels] = useState([{}]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  const handleOpenSearch = () => {
    setOpenSearch(true);
  };
  const handleCloseSearch = () => {
    setOpenSearch(false);
  };
  useEffect(() => {
    // if (searchText.length !== 0) {
    //   setNovels(
    //     Novels.filter((novel) =>
    //       novel.name.toLowerCase().includes(searchText.toLowerCase())
    //     )
    //   );
    // } else {
    //   setNovels([]);
      // }
    fetch(`http://localhost:8080/novel/search?search=${searchText}`,{
      method:"GET"
    })
    .then(res=>res.json())
    .then(data=>setNovels(data))
    .catch(e => console.log(e));
  }, [searchText]);
  useEffect(() => {
    if (!user) {
      setLinkUser("/login");
    } else {
      if (user.role === "ADMIN") setLinkUser("/profile/admin");
      else setLinkUser("/profile/user");
    }
  }, [user]);
  return (
    <div>
      <div className="header-container">
        <Link className="navbar-brand" to="/home" reloadDocument>
          <img
            src="/img/logo.svg"
            alt=""
            width="50"
            height="50"
            className="form-icon"
          />
          <p>Đọc truyện online</p>
        </Link>
        <div className="navbar-content">
          <ul className="nav-list">
            <NavbarLink to="/home">Trang chủ</NavbarLink>
            <NavbarLink to="/list">Danh sách</NavbarLink>
            <NavbarLink to="/authors">Tác giả</NavbarLink>
          </ul>
        </div>
        <div className="nav-icon">
          <Link
            to="#"
            className="material-symbols-rounded"
            onClick={handleOpenSearch}
          >
            search
          </Link>
          <Link
            to={linkUser}
            reloadDocument
            className="material-symbols-rounded"
          >
            person
          </Link>
        </div>
      </div>
      {openSearch && (
        <div className="search-tab">
          <X className="X" onClick={handleCloseSearch} />
          <input
            type="text"
            placeholder="Nhập tên truyện"
            values={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          {novels.length === 0 && <>không tìm thấy truyện</>}
          {novels.length !== 0 &&
            novels.map((novel) => (
              <NovelSearch
                novel_img={`${folderPath}/${novel.route}.png`}
                novel_name={novel.name}
                novel_route={novel.route}
              />
            ))}
        </div>
      )}
      <div
        className={openSearch ? "opacity-tab" : ""}
        onClick={handleCloseSearch}
      ></div>
    </div>
  );
};

export default Header;
