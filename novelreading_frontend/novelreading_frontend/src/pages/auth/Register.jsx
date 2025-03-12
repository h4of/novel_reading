import "./Register.css";

function Register() {
  return (
    <div className="register-container">
      <div className="logo">
        <a href="/home">
          <img src="logo.svg" alt="this is logo" width="100" height="50" />
        </a>
      </div>
      <div className="register-box">
        <form action="#" className="register-form">
          <h2 className="register-title">Đăng Ký</h2>
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
          <div className="input-wrapper">
            <i className="material-symbols-rounded">lock</i>
            <input
              type="password again"
              placeholder="password again"
              className="input-field"
              required
            />
          </div>
          <button className="register-button">Đăng ký</button>
        </form>
      </div>
      <div className="image-register">
        <img
          src="loginImage2.svg"
          alt="Ảnh sách"
          width="300"
          height="300"
          className="image-register-book"
        />
        <img
          src="loginImage1.svg"
          alt="Ảnh 1 cậu bé đọc sách"
          className="image-register-boy"
          width="300"
          height="300"
        />
      </div>
    </div>
  );
}

export default Register;
