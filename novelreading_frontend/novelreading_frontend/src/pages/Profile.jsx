import Header from "../components/Header.jsx";
import userAvatar from "../assets/images/user.png";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoadingComponent from "../components/LoadingComponent.jsx";
import RecentlyReadNovels from "../components/RecentlyReadNovels.jsx";
import EditProfileModal from "../components/EditProfileModal.jsx";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [recentNovels, setRecentNovels] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (localStorage.length !== 0) {
      const userData = localStorage.getItem('user');
      setUser(JSON.parse(userData));
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    fetch(`http://localhost:8080/user/${user.userID}/novel/reading?page=${currentPage - 1}&size=8`, {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        setRecentNovels(data.content);
        setTotalPages(data.totalPages);
      })
      .catch(e => console.log(e));
  }, [user, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const logoutClick = () => {
    localStorage.removeItem("user");
    fetch("http://localhost:8080/user/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.text())
      .then((data) => {
        alert(data);
        navigate("/home");
      });
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (updatedUser) => {
    setUser(updatedUser);
  };

  if (loading) return <LoadingComponent />;

  return (
    <div className="profile-page">
      <Header />
      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-user-info">
            <img src={userAvatar} alt="User avatar" className="user-avatar" />
            <div className="user-details">
              <h1 className="user-name">{user.name}</h1>
              <p className="user-email">{user.email}</p>
            </div>
          </div>
          <div className="profile-actions">
            <button className="edit-button" onClick={handleEditClick}>
              <i className="fas fa-edit"></i> Chỉnh sửa
            </button>
            <button className="logout-button" onClick={logoutClick}>
              <i className="fas fa-sign-out-alt"></i> Đăng xuất
            </button>
          </div>
        </div>

        <RecentlyReadNovels 
          novels={recentNovels} 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default Profile;
