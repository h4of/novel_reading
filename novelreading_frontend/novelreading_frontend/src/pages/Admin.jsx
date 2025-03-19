import "./Profile.css";
import user from "../assets/images/user.png";
import { useState } from "react";
import Header from "../components/Header";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const handleChange = (e) => {
    setSelectValue(e.target.value);
  };
  return (
    <div className="container">
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
          <div className="box">
            Chỉnh sửa thông tin truyện
            <select
              value={selectValue}
              onClick={handleChange}
              style={{ width: "" }}
            >
              <option value="">-----chọn truyện-----</option>
              <option value="">truyen1</option>
              <option value=""></option>
            </select>
          </div>
        )}
        {activeTab === "add" && (
          <div className="box">
            Thêm truyện mới
            <div className="input-wrapper">
              <input
                type="text"
                className="input-field"
                placeholder="Nhập tên truyện"
                required
              />
            </div>
            <button className="form-button">Thêm truyện</button>
          </div>
        )}
        {activeTab === "delete" && <div className="box">Xóa truyện</div>}
        {activeTab === "hide" && <div className="box">Ẩn truyện</div>}
      </div>
    </div>
  );
};

export default Admin;
