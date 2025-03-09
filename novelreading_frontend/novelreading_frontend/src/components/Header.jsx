import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="header-container">
        <a className="navbar-brand" href="#">
          <img
            src="logo.svg"
            alt=""
            width="50"
            height="50"
            className="form-icon"
          />
          <p>Đọc truyện online</p>
        </a>
        <div className="navbar-content">
          <ul className="nav-list">
            <li className="nav-item">Trang chủ</li>
            <li className="nav-item">Danh sách</li>
            <li className="nav-item">Tác giả</li>
          </ul>
        </div>
        <div className="nav-icon">
          <a href="#" className="material-symbols-rounded">
            search
          </a>
          <a href="#" className="material-symbols-rounded">
            person
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
