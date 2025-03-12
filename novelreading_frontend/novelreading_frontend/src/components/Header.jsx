import { Link } from "react-router-dom";
import "./Header.css";
import NavbarLink from "./NavbarLink.jsx";

const Header = () => {
  const role = true;
  return (
    <>
      <div className="header-container">
        <Link className="navbar-brand" to="/home" reloadDocument>
          <img
            src="/logo.svg"
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
            <NavbarLink to="/author">Tác giả</NavbarLink>
          </ul>
        </div>
        <div className="nav-icon">
          <Link to="#" className="material-symbols-rounded">
            search
          </Link>
          <Link
            // to="/login"
            reloadDocument
            to={role ? "/profile/admin" : "/profile/user"}
            className="material-symbols-rounded"
          >
            person
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
