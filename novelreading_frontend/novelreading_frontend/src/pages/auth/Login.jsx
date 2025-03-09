import "./Login.css";

function Login() {
  return (
    <div className="container">
      <div className="logo">
        <img src="logo.svg" alt="this is logo" width="100" height="50" />
      </div>
      <div className="login-container">
        <form action="#" className="login-form">
          <h2 className="login-title">Đăng Nhập</h2>
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
          <a className="forgot-password" href="#">
            <br></br>
            <u>
              <b>Bạn quên mật khẩu?</b>
            </u>
            <br></br>
          </a>
          <a className="register" href="#">
            Đăng ký
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
