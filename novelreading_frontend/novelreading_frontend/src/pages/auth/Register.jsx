import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordAgain, setPasswordAgain] = useState();
  const navigate = useNavigate();
  function handleClick() {
    let user = { email, password };
    fetch("http://localhost:8080/user/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json)
      .then(() => {
        alert("Đăng ký thành công");
        navigate("/login");
      })
      .catch((error) => {
        alert("Đăng ký không thành công");
      });
  }
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <i className="material-symbols-rounded">lock</i>
            <input
              type="password"
              placeholder="password"
              className="input-field"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <i className="material-symbols-rounded">lock</i>
            <input
              type="password"
              placeholder="password again"
              className="input-field"
              required
              value={passwordAgain}
              onChange={(e) => setPasswordAgain(e.target.value)}
            />
          </div>
          <button
            className="register-button"
            onClick={
              password === passwordAgain
                ? handleClick
                : () => alert("Mật khẩu không khớp")
            }
          >
            Đăng ký
          </button>
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
