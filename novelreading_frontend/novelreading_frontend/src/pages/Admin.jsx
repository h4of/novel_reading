import Header from "../components/Header";
import user from "../assets/images/user.png";
import "./Profile.css";
import { useState } from "react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("");
  return (
    <>
      <Header />
      <div className="profile-container">
        <p></p>
        <p className="text-profile">Hồ Sơ</p>
        <div className="profile-button">
          <button className="form-button">Đăng xuất</button>
        </div>
      </div>
      <div className="profile-user">
        <img src={user} className="user-image"></img>
        <div className="user-information">
          <p className="user-name">Admin</p>
        </div>
      </div>
      <div className="admin-function">
        <button onClick={() => setActiveTab("edit")} className="form-button">
          Chỉnh sửa thông tin truyện
        </button>
        <button onClick={() => setActiveTab("add")} className="form-button">
          Thêm truyện
        </button>
        <button onClick={() => setActiveTab("delete")} className="form-button">
          Xóa truyện
        </button>
        <button onClick={() => setActiveTab("hide")} className="form-button">
          Ẩn truyện
        </button>
      </div>
      <div className="profile-container">
        {activeTab === "edit" && (
          <div className="box">Chỉnh sửa thông tin truyện</div>
        )}
        {activeTab === "add" && <div className="box"></div>}
        {activeTab === "delete" && <div className="box">Xóa truyện</div>}
        {activeTab === "hide" && <div className="box">Ẩn truyện</div>}
      </div>
    </>
  );
};

export default Admin;
