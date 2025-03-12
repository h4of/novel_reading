import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login-container">
      <div className="logo">
        <a href="/home">
          <img src="logo.svg" alt="this is logo" width="100" height="50" />
        </a>
      </div>
      <div className="login-box">
        <form action="#" className="login-form">
          <h1 className="login-title">Đăng Nhập</h1>
          <div className="input-wrapper">
            <i className="material-symbols-rounded">person</i>
            <input
              type="email"
              placeholder="Email address"
              className="input-field"
              required
            />
          </div>
          <div className="input-wrapper">
            <i className="material-symbols-rounded">lock</i>
            <input
              type="password"
              placeholder="password"
              className="input-field"
              required
            />
          </div>
          <button className="login-button">Đăng nhập</button>
          <Link className="register-button" to="/register" reloadDocument>
            Đăng ký
          </Link>
          <a className="forgot-password-txt" href="#">
            <br></br>
            <u>
              <b>Bạn quên mật khẩu?</b>
            </u>
            <br></br>
          </a>
        </form>
      </div>
      <div className="image-login">
        <img
          src="loginImage2.svg"
          alt="Ảnh sách"
          width="300"
          height="300"
          className="image-login-book"
        />
        <img
          src="loginImage1.svg"
          alt="Ảnh 1 cậu bé đọc sách"
          className="image-login-boy"
          width="300"
          height="300"
        />
      </div>
    </div>
  );
}

export default Login;
