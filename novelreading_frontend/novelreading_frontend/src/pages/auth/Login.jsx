import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoadingComponent from "../../components/LoadingComponent";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const loginClick = (e) => {
    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }
    e.preventDefault();
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Đăng nhập thất bại");
        }
        fetch("http://localhost:8080/user/current-user", {
          method: "GET",
          credentials: "include",
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("HTTP error " + res.status);
            }
            return res.json();
          })
          .then((data) =>{
            localStorage.setItem("user", JSON.stringify(data));
            setUser(data);
            console.log(data);
            setLoading(false);
          })
          .catch((e) => console.log("Lỗi: " + e));
        alert("Đăng nhập thành công");
        navigate("/home");
        window.location.reload();
        return res.text();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) =>{
        alert(e.message);
        console.log(e)
      });
  };
  
  if(loading) return <LoadingComponent/>
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
          <button className="login-button" onClick={loginClick}>
            Đăng nhập
          </button>
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
