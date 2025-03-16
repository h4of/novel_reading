import Header from "../components/Header";
import user from "../assets/images/user.png";
import "./Profile.css";

const Profile = () => {
  const userName = "";
  return (
    <div className="container">
      <Header />
      <div className="profile-container">
        <p></p>
        <p className="text-profile">Hồ Sơ</p>
        <div className="profile-button">
          <button className="form-button">Đăng xuất</button>
          <button className="form-button">Chỉnh sửa</button>
        </div>
      </div>
      <div className="profile-user">
        <img src={user} className="user-image"></img>
        <div className="user-information">
          <p className="user-name">{userName}</p>
        </div>
      </div>
      <div className="novel-recently">
        <span>Truyện đọc gần đây</span>
      </div>
    </div>
  );
};

export default Profile;
