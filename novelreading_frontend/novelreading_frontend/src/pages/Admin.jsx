import React, { useState } from "react";
import './Admin.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Common Components
const removeTypeLanguage = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .replace(/ /g, "-");
};


const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("stories");
  
  // States for Stories
  const [showAddStory, setShowAddStory] = useState(false);
  const [showEditStory, setShowEditStory] = useState(false);
  const [showDeleteStory, setShowDeleteStory] = useState(false);
  const [novelName, setNovelName] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ongoing');
  const [novelDescription, setNovelDescription] = useState('');
  const [storyImageFile, setStoryImageFile] = useState(null);
  

  // States for Authors
  const [showAddAuthor, setShowAddAuthor] = useState(false);
  const [showEditAuthor, setShowEditAuthor] = useState(false);
  const [showDeleteAuthor, setShowDeleteAuthor] = useState(false);
  const [authorImageFile, setAuthorImageFile] = useState(null);

  // States for Chapters
  const [showAddChapter, setShowAddChapter] = useState(false);
  const [showEditChapter, setShowEditChapter] = useState(false);
  const [showDeleteChapter, setShowDeleteChapter] = useState(false);
  
  // States for Users
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);

  // States for image preview
  const [storyImagePreview, setStoryImagePreview] = useState(null);
  const [authorImagePreview, setAuthorImagePreview] = useState(null);

  // Sample Data
  const [stories, setStories] = useState([]);
  const [currentStoriesPage, setCurrentStoriesPage] = useState(0);
  const [totalStoriesPages, setTotalStoriesPages] = useState(0);

  // Static
  const [totalStories,setTotalStories] = useState(0);
  const [totalAuthors,setTotalAuthors] = useState(0);
  const [totalUsers,setTotalUsers] = useState(0);
  // const [totalChapters,setTotalChapters] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8080/novel/getAll?page=${currentStoriesPage}&size=12`,{
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setStories(data.content);
        setTotalStoriesPages(data.totalPages);
        setTotalStories(data.totalElements);
      });
  }, [currentStoriesPage]);

  const [authors, setAuthors] = useState([]);
  const [currentAuthorsPage, setCurrentAuthorsPage] = useState(0);
  const [totalAuthorsPages, setTotalAuthorsPages] = useState(0);
  useEffect(() => {
    fetch(`http://localhost:8080/author/getAll?page=${currentAuthorsPage}&size=12`,{
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setAuthors(data.content);
        setTotalAuthorsPages(data.totalPages);
        setTotalAuthors(data.totalElements);
      });
  }, [currentAuthorsPage]);

  const [chapters, setChapters] = useState([]);
  const [currentChaptersPage, setCurrentChaptersPage] = useState(0);
  const [totalChaptersPages, setTotalChaptersPages] = useState(0);
  useEffect(() => {
    fetch(`http://localhost:8080/chapter/getAll?page=${currentChaptersPage}&size=12`,{
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setChapters(data.content); 
        setTotalChaptersPages(data.totalPages);
        // setTotalChapters(data.totalElements);
      });
  }, [currentChaptersPage]);

  const [users, setUsers] = useState([]);
  const [currentUsersPage, setCurrentUsersPage] = useState(0);
  const [totalUsersPages, setTotalUsersPages] = useState(0);
  useEffect(() => {
    fetch(`http://localhost:8080/admin/user/getAll?page=${currentUsersPage}&size=12`,{
      method: "GET", 
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.content);
        setTotalUsersPages(data.totalPages);
        console.log(data.totalElements)
        setTotalUsers(data.totalElements);
      });
  }, [currentUsersPage]);

  // For FindById
  const [storyID,setStoryID] = useState();
  const [authorID,setAuthorID] = useState();
  const [chapterID,setChapterID] = useState();
  const [userID,setUserID] = useState();

  // Form validation states
  const [formErrors, setFormErrors] = useState({});

  // States for editing
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);

  // States for Statistics


  const validateForm = (formData) => {
    const errors = {};
    Object.keys(formData).forEach(key => {
      const value = formData[key];
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        errors[key] = 'Vui lòng điền thông tin này';
      }
    });
    return errors;
  };

  const handleSubmit = (e, formType) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // const errors = validateForm(data);
    // if (Object.keys(errors).length > 0) {
    //   setFormErrors(errors);
    //   return;
    // }

    // Reset errors and close modal
    setFormErrors({});
    switch (formType) {
      case 'story':
        setShowAddStory(false);
        break;
      case 'author':
        setShowAddAuthor(false);
        break;
      case 'chapter':
        setShowAddChapter(false);
        break;
      case 'user':
        setShowAddUser(false);
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
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

  // Handle edit
  const handleEdit = (item, type) => {
    setEditingItem({ ...item, type });
    switch (type) {
      case 'story':
        setShowEditStory(true);
        break;
      case 'author':
        setShowEditAuthor(true);
        break;
      case 'chapter':
        setShowEditChapter(true);
        break;
      case 'user':
        setShowEditUser(true);
        break;
      default:
        break;
    }
  };

  // Handle delete
  const handleDelete = (item, type) => {
    setDeletingItem({ ...item, type });
    switch (type) {
      case 'story':
        setShowDeleteStory(true);
        break;
      case 'author':
        setShowDeleteAuthor(true);
        break;
      case 'chapter':
        setShowDeleteChapter(true);
        break;
      case 'user':
        setShowDeleteUser(true);
        break;
      default:
        break;
    }
  };

  //Find
  const handleFind = (type, searchTerm) => {
    if (!searchTerm) {
      // If search term is empty, reload the full list
      switch(type){
        case 'story':
          fetch(`http://localhost:8080/novel/getAll?page=0&size=12`,{
            method: "GET",
          })
            .then((res) => res.json())
            .then((data) => {
              setStories(data.content);
              setTotalStoriesPages(data.totalPages);
              setTotalStories(data.totalElements);
            });
          break;
        case 'author':
          fetch(`http://localhost:8080/author/getAll?page=0&size=12`,{
            method: "GET",
          })
            .then((res) => res.json())
            .then((data) => {
              setAuthors(data.content);
              setTotalAuthorsPages(data.totalPages);
              setTotalAuthors(data.totalElements);
            });
          break;
        case 'chapter':
          fetch(`http://localhost:8080/chapter/getAll?page=0&size=12`,{
            method: "GET",
          })
            .then((res) => res.json())
            .then((data) => {
              setChapters(data.content);
              setTotalChaptersPages(data.totalPages);
              // setTotalChapters(data.totalElements);
            });
          break;
        case 'user':
          fetch(`http://localhost:8080/admin/user/getAll?page=0&size=12`,{
            method: "GET",
            credentials: "include",
          })
            .then((res) => res.json())
            .then((data) => {
              setUsers(data.content);
              setTotalUsersPages(data.totalPages);
              console.log(data.totalElements);
              setTotalUsers(data.totalElements);
            });
          break;
        default:
          break;
      }
      return;
    }

    // Perform search with searchTerm
    switch(type){
      case 'story':
        fetch(`http://localhost:8080/admin/novel/find/${searchTerm}`,{
          method: 'GET',
          credentials: 'include',
        })
        .then((res) => res.json())
        .then((data) => {
          // Assuming the backend returns a single object for ID search
          // We wrap it in an array to match the state structure
          setStories([data]);
        }).catch(e => {
          alert('Không tìm thấy truyện');
          console.error(e);
          setStories([]); // Clear the list if not found
        });
        break;
      case 'author':
         fetch(`http://localhost:8080/admin/author/find/${searchTerm}`,{
          method: 'GET',
          credentials: 'include',
        })
        .then((res) => res.json())
        .then((data) => {
          setAuthors([data]);
        }).catch(e => {
          alert('Không tìm thấy tác giả');
          console.error(e);
          setAuthors([]);
        });
        break;
      case 'chapter':
        fetch(`http://localhost:8080/admin/chapter/find/${searchTerm}`,{
          method: 'GET',
          credentials: 'include',
        })
        .then((res) => res.json())
        .then((data) => {
          setChapters([data]);
        }).catch(e => {
          alert('Không tìm thấy chương');
          console.error(e);
          setChapters([]);
        });
        break;
      case 'user':
         fetch(`http://localhost:8080/admin/user/find/${searchTerm}`,{
          method: 'GET',
          credentials: 'include',
        })
        .then((res) => res.json())
        .then((data) => {
          setUsers([data]);
        }).catch(e => {
          alert('Không tìm thấy người dùng');
          console.error(e);
          setUsers([]);
        });
        break;
      default:
        break;
    }
  }

  // Confirm delete
  const confirmDelete = () => {
    if (!deletingItem) return;

    switch (deletingItem.type) {
      case 'story':
        fetch(`http://localhost:8080/admin/novel/delete/${deletingItem.id}`,{
          method: 'DELETE',
          credentials: 'include',
        })
        .then((res) => res.text())
        .then((data) => {
          alert(data);
          window.location.reload();
        }).catch(e => alert(e));
        break;
      case 'author':
        fetch(`http://localhost:8080/admin/author/delete/${deletingItem.id}`,{
          method: 'DELETE',
          credentials: 'include',
        })
        .then((res) => res.text())
        .then((data) => {
          alert(data);
          window.location.reload();
        }).catch(e => alert(e));
        break;
      case 'chapter':
        fetch(`http://localhost:8080/admin/chapter/delete/${deletingItem.id}`,{
          method: 'DELETE',
          credentials: 'include',
        })
        .then((res) => res.text())
        .then((data) => {
          alert(data);
          window.location.reload();
        }).catch(e => alert(e));
        break;
      case 'user':
        fetch(`http://localhost:8080/admin/user/delete/${deletingItem.userID}`,{
          method: 'DELETE',
          credentials: 'include',
        })
        .then((res) => res.text())
        .then((data) => {
          alert(data);
          window.location.reload();
        }).catch(e => alert(e));
        break;
      default:
        break;
    }

    // Reset states
    setDeletingItem(null);
    setShowDeleteStory(false);
    setShowDeleteAuthor(false);
    setShowDeleteChapter(false);
    setShowDeleteUser(false);
  };

  // Handle edit submit
  const handleEditSubmit = (e, type) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const errors = validateForm(data);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Update data based on type
    switch (type) {
      case 'story':
        setStories(stories.map(s => 
          s.id === editingItem.id ? { ...s, ...data } : s
        ));
        break;
      case 'author':
        setAuthors(authors.map(a => 
          a.id === editingItem.id ? { ...a, ...data } : a
        ));
        break;
      case 'chapter':
        setChapters(chapters.map(c => 
          c.id === editingItem.id ? { ...c, ...data } : c
        ));
        break;
      case 'user':
        setUsers(users.map(u => 
          u.userID === editingItem.userID ? { ...u, ...data } : u
        ));
        break;
      default:
        break;
    }

    // Reset states
    setEditingItem(null);
    setFormErrors({});
    setShowEditStory(false);
    setShowEditAuthor(false);
    setShowEditChapter(false);
    setShowEditUser(false);
  };

  // Handle image upload
  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if(type === 'story') setStoryImageFile(file);
    else setAuthorImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'story') {
          setStoryImagePreview(reader.result);
        } else {
          setAuthorImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset image preview
  const resetImagePreview = (type) => {
    if (type === 'story') {
      setStoryImagePreview(null);
    } else {
      setAuthorImagePreview(null);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "stories":
        return (
          <ManageStories 
            stories={stories}
            authors={authors}
            onAdd={() => setShowAddStory(true)}
            onEdit={(item) => handleEdit(item, 'story')}
            onDelete={(item) => handleDelete(item, 'story')}
            onFind = {(searchTerm) => handleFind('story', searchTerm)}
            currentStoriesPage={currentStoriesPage}
            totalStoriesPages={totalStoriesPages}
            setCurrentStoriesPage={setCurrentStoriesPage}
            storyID={storyID}
            setStoryID={setStoryID}
          />
        );
      case "authors":
        return (
          <ManageAuthors 
            authors={authors}
            onAdd={() => setShowAddAuthor(true)}
            onEdit={(item) => handleEdit(item, 'author')}
            onDelete={(item) => handleDelete(item, 'author')}
            onFind={(searchTerm) => handleFind('author',searchTerm)}
            currentAuthorsPage={currentAuthorsPage}
            totalAuthorsPages={totalAuthorsPages}
            setCurrentAuthorsPage={setCurrentAuthorsPage}
            authorID={authorID}
            setAuthorID={setAuthorID}
          />
        );
      case "chapters":
        return (
          <ManageChapters 
            chapters={chapters}
            stories={stories}
            onAdd={() => setShowAddChapter(true)}
            onEdit={(item) => handleEdit(item, 'chapter')}
            onDelete={(item) => handleDelete(item, 'chapter')}
            onFind={(searchTerm) => handleFind('chapter',searchTerm)}
            currentChaptersPage={currentChaptersPage}
            totalChaptersPages={totalChaptersPages}
            setCurrentChaptersPage={setCurrentChaptersPage}
            chapterID={chapterID}
            setChapterID={setChapterID}
          />
        );
      case "users":
        return (
          <ManageUsers 
            users={users}
            onAdd={() => setShowAddUser(true)}
            onEdit={(item) => handleEdit(item, 'user')}
            onDelete={(item) => handleDelete(item, 'user')}
            onFind={(searchTerm) => handleFind('user',searchTerm)}
            currentUsersPage={currentUsersPage}
            totalUsersPages={totalUsersPages}
            setCurrentUsersPage={setCurrentUsersPage}
            userID={userID}
            setUserID={setUserID}
          />
        );
      case "statistics":
        return <Statistics stories={stories} totalAuthors={totalAuthors} totalStories={totalStories} totalUsers={totalUsers}/>;
      default:
        return null;
    }
  };
  

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Admin</h2>
        <nav>
          <button 
            className={activeTab === 'stories' ? 'active' : ''} 
            onClick={() => setActiveTab('stories')}
          >
            Quản lý truyện
          </button>
          <button 
            className={activeTab === 'authors' ? 'active' : ''} 
            onClick={() => setActiveTab('authors')}
          >
            Quản lý tác giả
          </button>
          <button 
            className={activeTab === 'chapters' ? 'active' : ''} 
            onClick={() => setActiveTab('chapters')}
          >
            Quản lý chương
          </button>
          <button 
            className={activeTab === 'users' ? 'active' : ''} 
            onClick={() => setActiveTab('users')}
          >
            Quản lý người dùng
          </button>
          <button 
            className={activeTab === 'statistics' ? 'active' : ''} 
            onClick={() => setActiveTab('statistics')}
          >
            Thống kê
          </button>
          <div className="sidebar-bottom-buttons">
            <div className="sidebar-divider"></div>
            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Đăng xuất
            </button>
            <button
              className="logout-button"
              onClick={() => navigate("/home")}
            >
              Trở về trang chủ
            </button>
          </div>
        </nav>
      </div>
      <div className="main-content">
        {renderContent()}
      </div>

      {/* Story Modals */}
      {showAddStory && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Thêm truyện mới</h3>
            <form className="story-form" onSubmit={(e) => handleSubmit(e, 'story')}>
              <div className="form-group">
                <label htmlFor="storyTitle">Tên truyện:</label>
                <input 
                  type="text" 
                  id="storyTitle"
                  name="title"
                  placeholder="Nhập tên truyện" 
                  value={novelName}
                  onChange={(e) => setNovelName(e.target.value)}
                  required 
                />
                {formErrors.title && <span className="error-message">{formErrors.title}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="storyImage">Ảnh bìa:</label>
                <div className="image-upload-container">
                  <input 
                    type="file" 
                    id="storyImage"
                    name="image"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'story')}
                    className="image-upload-input"
                  />
                  <label htmlFor="storyImage" className="image-upload-label">
                    {storyImagePreview ? 'Thay đổi ảnh' : 'Chọn ảnh'}
                  </label>
                  {storyImagePreview && (
                    <div className="image-preview-container">
                      <img src={storyImagePreview} alt="Preview" className="image-preview" />
                      <button 
                        type="button" 
                        className="remove-image-button"
                        onClick={() => resetImagePreview('story')}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
                {formErrors.image && <span className="error-message">{formErrors.image}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="storyAuthor">Tác giả:</label>
                <select id="storyAuthor" name="authorId" value={selectedAuthor} onChange={(e) => setSelectedAuthor(e.target.value)} required>
                  <option value="">Chọn tác giả</option>
                  {authors.map(author => (
                    <option key={author.id} value={author.route}>
                      {author.name}
                    </option>
                  ))}
                </select>
                {formErrors.authorId && <span className="error-message">{formErrors.authorId}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="storyGenre">Thể loại:</label>
                <select id="storyGenre" name="genre" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} required>
                  <option value="">Chọn thể loại</option>
                  <option value="historical-fantasy">Kỳ ảo lịch sử</option>
                  <option value="satirical">Trào phúng</option>
                  <option value="action">Hành động</option>
                  <option value="romance">Tình cảm</option>
                  <option value="fantasy">Viễn tưởng</option>
                  <option value="detective">Trinh thám</option>
                  <option value="science">Khoa học</option>
                </select>
                {formErrors.genre && <span className="error-message">{formErrors.genre}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="storyDescription">Mô tả:</label>
                <textarea 
                  id="storyDescription"
                  name="description"
                  placeholder="Nhập mô tả truyện"
                  value={novelDescription}
                  onChange={(e) => setNovelDescription(e.target.value)}
                  required
                ></textarea>
                {formErrors.description && <span className="error-message">{formErrors.description}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="storyStatus">Trạng thái:</label>
                <select id="storyStatus" name="status" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} required>
                  <option value="ongoing">Đang tiến hành</option>
                  <option value="completed">Hoàn thành</option>
                </select>
                {formErrors.status && <span className="error-message">{formErrors.status}</span>}
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setShowAddStory(false)}>Hủy</button>
                <button type="submit" className="submit-button" onClick={() => {
                  fetch(`http://localhost:8080/admin/novel/add`,{
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name: novelName,
                      author:selectedAuthor,
                      genre:selectedGenre,
                      route: removeTypeLanguage(novelName),
                      anou:novelDescription,
                      status:selectedStatus
                    })
                  }).catch(e => alert(e));
                  const formData = new FormData();
                  formData.append('name', removeTypeLanguage(novelName));
                  formData.append('image', storyImageFile);
                  fetch(`http://localhost:8080/admin/image/save`,{
                    method: 'POST',
                    credentials: 'include',
                    body: formData
                  }).catch(e => {
                    alert(e);
                    return;
                  });
                  alert('Thêm truyện thành công');
                  window.location.reload();
                }}>Thêm truyện</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Author Modals */}
      {showAddAuthor && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Thêm tác giả mới</h3>
            <form className="author-form" onSubmit={(e) => handleSubmit(e, 'author')}>
              <div className="form-group">
                <label htmlFor="authorName">Tên tác giả:</label>
                <input 
                  type="text" 
                  id="authorName"
                  name="name"
                  placeholder="Nhập tên tác giả" 
                  required 
                />
                {formErrors.name && <span className="error-message">{formErrors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="authorImage">Ảnh tác giả:</label>
                <div className="image-upload-container">
                  <input 
                    type="file" 
                    id="authorImage"
                    name="image"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'author')}
                    className="image-upload-input"
                  />
                  <label htmlFor="authorImage" className="image-upload-label">
                    {authorImagePreview ? 'Thay đổi ảnh' : 'Chọn ảnh'}
                  </label>
                  {authorImagePreview && (
                    <div className="image-preview-container">
                      <img src={authorImagePreview} alt="Preview" className="image-preview" />
                      <button 
                        type="button" 
                        className="remove-image-button"
                        onClick={() => resetImagePreview('author')}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
                {formErrors.image && <span className="error-message">{formErrors.image}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="authorBirthDate">Ngày sinh:</label>
                <input 
                  type="text" 
                  id="authorBirthDate"
                  name="birthDate"
                  placeholder="Nhập ngày sinh"
                  required 
                />
                {formErrors.birthDate && <span className="error-message">{formErrors.birthDate}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="authorIntroduction">Giới thiệu:</label>
                <textarea 
                  id="authorIntroduction"
                  name="introduction"
                  placeholder="Nhập giới thiệu về tác giả" 
                  rows="4"
                  required
                ></textarea>
                {formErrors.introduction && <span className="error-message">{formErrors.introduction}</span>}
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setShowAddAuthor(false)}>Hủy</button>
                <button type="submit" className="submit-button" onClick={()=>{
                  fetch(`http://localhost:8080/admin/author/add`,{
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name:document.getElementById('authorName').value,
                      route: removeTypeLanguage(document.getElementById('authorName').value),
                      date: document.getElementById('authorBirthDate').value,
                      anou: document.getElementById('authorIntroduction').value
                    })
                  }).catch(e => alert(e));
                    const formData = new FormData();
                    formData.append('name', removeTypeLanguage(document.getElementById('authorName').value));
                    formData.append('image', authorImageFile);
                    fetch(`http://localhost:8080/admin/image/save`,{
                      method: 'POST',
                      credentials: 'include',
                      body: formData
                    }).catch(e => {
                      alert(e);
                      return;
                    });
                  alert('Cập nhật tác giả thành công');
                  window.location.reload();
                }}>Thêm tác giả</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Chapter Modals */}
      {showAddChapter && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Thêm chương mới</h3>
            <form className="chapter-form" onSubmit={(e) => handleSubmit(e, 'chapter')}>
              <div className="form-group">
                <label htmlFor="chapterStory">Truyện:</label>
                <select id="chapterStory" name="storyId" required>
                  <option value="">Chọn truyện</option>
                  {stories.map(story => (
                    <option key={story.id} value={story.id}>
                      {story.name}
                    </option>
                  ))}
                </select>
                {formErrors.storyId && <span className="error-message">{formErrors.storyId}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="chapterTitle">Tên chương:</label>
                <input 
                  type="text" 
                  id="chapterTitle"
                  name="title"
                  placeholder="Nhập tên chương" 
                  required 
                />
                {formErrors.title && <span className="error-message">{formErrors.title}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="chapterContent">Nội dung:</label>
                <input 
                  type="file" 
                  id="chapterContent"
                  name="content"
                  accept=".txt"
                  required 
                />
                {formErrors.content && <span className="error-message">{formErrors.content}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="chapterOrder">Thứ tự:</label>
                <input 
                  type="number" 
                  id="chapterOrder"
                  name="order"
                  min="1" 
                  placeholder="Nhập thứ tự chương" 
                  required 
                />
                {formErrors.order && <span className="error-message">{formErrors.order}</span>}
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setShowAddChapter(false)}>Hủy</button>
                <button type="submit" className="submit-button" onClick={() => {
                  const formData = new FormData();
                  formData.append('novelID', document.getElementById('chapterStory').value);
                  formData.append('title', document.getElementById('chapterTitle').value);
                  formData.append('chapterNumber', document.getElementById('chapterOrder').value);
                  formData.append('file', document.getElementById('chapterContent').files[0]);
                  fetch(`http://localhost:8080/admin/chapter/add`,{
                    method: 'POST',
                    credentials: 'include',
                    body: formData
                  }).catch(e => alert(e));
                  alert('Thêm chương thành công');
                  window.location.reload();
                }}>Thêm chương</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Modals */}
      {showAddUser && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Thêm người dùng mới</h3>
            <form className="user-form" onSubmit={(e) => handleSubmit(e, 'user')}>
              <div className="form-group">
                <label htmlFor="userUsername">Tên quản trị:</label>
                <input 
                  type="text" 
                  id="userUsername"
                  name="username"
                  placeholder="Nhập tên quản trị" 
                  required 
                />
                {formErrors.username && <span className="error-message">{formErrors.username}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="userEmail">Email:</label>
                <input 
                  type="email" 
                  id="userEmail"
                  name="email"
                  placeholder="Nhập email" 
                  required 
                />
                {formErrors.email && <span className="error-message">{formErrors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="userPassword">Mật khẩu:</label>
                <input 
                  type="password" 
                  id="userPassword"
                  name="password"
                  placeholder="Nhập mật khẩu" 
                  required 
                />
                {formErrors.password && <span className="error-message">{formErrors.password}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="userRole">Vai trò:</label>
                <select id="userRole" name="role" required>
                  <option value="ADMIN">Quản trị viên</option>
                </select>
                {formErrors.role && <span className="error-message">{formErrors.role}</span>}
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setShowAddUser(false)}>Hủy</button>
                <button type="submit" className="submit-button" onClick={()=>{
                  fetch("http://localhost:8080/register",{
                    method:"POST",
                    credentials:"include",
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      email:document.getElementById('userEmail').value,
                      name: document.getElementById('userUsername').value,
                      password: document.getElementById('userPassword').value,
                      role:"ADMIN"
                    })
                  }).catch(e => alert(e));
                  alert("Thêm thành công!");
                  window.location.reload();
                }}>Thêm quản trị</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Story Modal */}
      {showEditStory && editingItem && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Chỉnh sửa truyện</h3>
            <form className="story-form" onSubmit={(e) => handleEditSubmit(e, 'story')}>
              <div className="form-group">
                <label htmlFor="editStoryTitle">Tên truyện:</label>
                <input 
                  type="text" 
                  id="editStoryTitle"
                  name="title"
                  defaultValue={editingItem.name}
                  required 
                />
                {formErrors.title && <span className="error-message">{formErrors.title}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="editStoryImage">Ảnh bìa:</label>
                <div className="image-upload-container">
                  <input 
                    type="file" 
                    id="editStoryImage"
                    name="image"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'story')}
                    className="image-upload-input"
                  />
                  <label htmlFor="editStoryImage" className="image-upload-label">
                    {storyImagePreview ? 'Thay đổi ảnh' : 'Chọn ảnh'}
                  </label>
                  {storyImagePreview && (
                    <div className="image-preview-container">
                      <img src={storyImagePreview} alt="Preview" className="image-preview" />
                      <button 
                        type="button" 
                        className="remove-image-button"
                        onClick={() => resetImagePreview('story')}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
                {formErrors.image && <span className="error-message">{formErrors.image}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="editStoryAuthor">Tác giả:</label>
                <select 
                  id="editStoryAuthor" 
                  name="authorId" 
                  defaultValue={editingItem.author}
                  required
                >
                  <option value="">Chọn tác giả</option>
                  {authors.map(author => (
                    <option key={author.id} value={author.route}>
                      {author.name}
                    </option>
                  ))}
                </select>
                {formErrors.authorId && <span className="error-message">{formErrors.authorId}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="editStoryGenre">Thể loại:</label>
                <select 
                  id="editStoryGenre" 
                  name="genre"
                  defaultValue={editingItem.genre}
                  required
                >
                  <option value="">Chọn thể loại</option>
                  <option value="historical-fantasy">Kỳ ảo lịch sử</option>
                  <option value="satirical">Trào phúng</option>
                  <option value="action">Hành động</option>
                  <option value="romance">Tình cảm</option>
                  <option value="fantasy">Viễn tưởng</option>
                  <option value="detective">Trinh thám</option>
                  <option value="science">Khoa học</option>
                </select>
                {formErrors.genre && <span className="error-message">{formErrors.genre}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="editStoryDescription">Mô tả:</label>
                <textarea 
                  id="editStoryDescription"
                  name="description"
                  defaultValue={editingItem.anou}
                  placeholder="Nhập mô tả truyện"
                  required
                ></textarea>
                {formErrors.description && <span className="error-message">{formErrors.description}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="editStoryStatus">Trạng thái:</label>
                <select 
                  id="editStoryStatus" 
                  name="status"
                  defaultValue={editingItem.status}
                  required
                >
                  <option value="stopped">Đã dừng</option>
                  <option value="ongoing">Đang tiến hành</option>
                  <option value="completed">Hoàn thành</option>
                </select>
                {formErrors.status && <span className="error-message">{formErrors.status}</span>}
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setShowEditStory(false)}>Hủy</button>
                <button type="submit" className="submit-button" onClick={() => {
                  fetch(`http://localhost:8080/admin/novel/update/${editingItem.id}`,{
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name: document.getElementById('editStoryTitle').value,
                      author: document.getElementById('editStoryAuthor').value,
                      genre: document.getElementById('editStoryGenre').value,
                      route: removeTypeLanguage(document.getElementById('editStoryTitle').value),
                      anou: document.getElementById('editStoryDescription').value,
                      status: document.getElementById('editStoryStatus').value
                    })
                  }).catch(e => alert(e));
                  if (storyImageFile) {
                    const formData = new FormData();
                    formData.append('name', removeTypeLanguage(document.getElementById('editStoryTitle').value));
                    formData.append('image', storyImageFile);
                    fetch(`http://localhost:8080/admin/image/save`,{
                      method: 'POST',
                      credentials: 'include',
                      body: formData
                    }).catch(e => {
                      alert(e);
                      return;
                    });
                  }
                  alert('Cập nhật truyện thành công');
                  window.location.reload();
                }}>Lưu thay đổi</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Author Modal */}
      {showEditAuthor && editingItem && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Chỉnh sửa tác giả</h3>
            <form className="author-form" onSubmit={(e) => handleEditSubmit(e, 'author')}>
              <div className="form-group">
                <label htmlFor="editAuthorName">Tên tác giả:</label>
                <input 
                  type="text" 
                  id="editAuthorName"
                  name="name"
                  defaultValue={editingItem.name}
                  required 
                />
                {formErrors.name && <span className="error-message">{formErrors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="editAuthorImage">Ảnh tác giả:</label>
                <div className="image-upload-container">
                  <input 
                    type="file" 
                    id="editAuthorImage"
                    name="image"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'author')}
                    className="image-upload-input"
                  />
                  <label htmlFor="editAuthorImage" className="image-upload-label">
                    {authorImagePreview ? 'Thay đổi ảnh' : 'Chọn ảnh'}
                  </label>
                  {authorImagePreview && (
                    <div className="image-preview-container">
                      <img src={authorImagePreview} alt="Preview" className="image-preview" />
                      <button 
                        type="button" 
                        className="remove-image-button"
                        onClick={() => resetImagePreview('author')}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
                {formErrors.image && <span className="error-message">{formErrors.image}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="editAuthorBirthDate">Ngày sinh:</label>
                <input 
                  type="text" 
                  id="editAuthorBirthDate"
                  name="birthDate"
                  defaultValue={editingItem.date}
                  placeholder="Nhập ngày sinh"
                  required 
                />
                {formErrors.birthDate && <span className="error-message">{formErrors.birthDate}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="editAuthorIntroduction">Giới thiệu:</label>
                <textarea 
                  id="editAuthorIntroduction"
                  name="introduction"
                  defaultValue={editingItem.anou}
                  rows="4"
                  required
                ></textarea>
                {formErrors.introduction && <span className="error-message">{formErrors.introduction}</span>}
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setShowEditAuthor(false)}>Hủy</button>
                <button type="submit" className="submit-button" onClick={() => {
                  fetch(`http://localhost:8080/admin/author/update/${editingItem.id}`,{
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name: document.getElementById('editAuthorName').value,
                      date: document.getElementById('editAuthorBirthDate').value,
                      anou: document.getElementById('editAuthorIntroduction').value,
                      route: removeTypeLanguage(document.getElementById('editAuthorName').value)
                    })
                  }).catch(e => alert(e));
                  if (authorImageFile) {
                    const formData = new FormData();
                    formData.append('name', removeTypeLanguage(document.getElementById('editAuthorName').value));
                    formData.append('image', authorImageFile);
                    fetch(`http://localhost:8080/admin/image/save`,{
                      method: 'POST',
                      credentials: 'include',
                      body: formData
                    }).catch(e => {
                      alert(e);
                      return;
                    });
                  }
                  alert('Cập nhật tác giả thành công');
                  window.location.reload();
                }}>Lưu thay đổi</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Chapter Modal */}
      {showEditChapter && editingItem && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Chỉnh sửa chương</h3>
            <form className="chapter-form" onSubmit={(e) => handleEditSubmit(e, 'chapter')}>
              <div className="form-group">
                <label htmlFor="editChapterStory">Truyện:</label>
                <select 
                  id="editChapterStory" 
                  name="storyId"
                  defaultValue={editingItem.storyId}
                  required
                >
                  <option value="">Chọn truyện</option>
                  {stories.map(story => (
                    <option key={story.id} value={story.id}>
                      {story.name}
                    </option>
                  ))}
                </select>
                {formErrors.storyId && <span className="error-message">{formErrors.storyId}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="editChapterTitle">Tên chương:</label>
                <input 
                  type="text" 
                  id="editChapterTitle"
                  name="title"
                  defaultValue={editingItem.title}
                  required 
                />
                {formErrors.title && <span className="error-message">{formErrors.title}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="editChapterContent">Nội dung:</label>
                <input 
                  type="file" 
                  id="editChapterContent"
                  name="content"
                  accept=".txt"
                  required 
                />
                {formErrors.content && <span className="error-message">{formErrors.content}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="editChapterOrder">Thứ tự:</label>
                <input 
                  type="number" 
                  id="editChapterOrder"
                  name="order"
                  min="1"
                  defaultValue={editingItem.order}
                  required 
                />
                {formErrors.order && <span className="error-message">{formErrors.order}</span>}
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setShowEditChapter(false)}>Hủy</button>
                <button type="submit" className="submit-button" onClick={() => {
                  const formData = new FormData();
                  formData.append('novelID', document.getElementById('editChapterStory').value);
                  formData.append('title', document.getElementById('editChapterTitle').value);
                  formData.append('chapterNumber', document.getElementById('editChapterOrder').value);
                  formData.append('file', document.getElementById('editChapterContent').files[0]);
                  fetch(`http://localhost:8080/admin/chapter/update/${editingItem.id}`,{
                    method: 'PUT',
                    credentials: 'include',
                    body: formData
                  }).catch(e => alert(e));
                  alert('Cập nhật chương thành công');
                  window.location.reload();
                }}>Lưu thay đổi</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUser && editingItem && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Chỉnh sửa người dùng</h3>
            <form className="user-form" onSubmit={(e) => handleEditSubmit(e, 'user')}>
              <div className="form-group">
                <label htmlFor="editUserUsername">Tên người dùng:</label>
                <input 
                  type="text" 
                  id="editUserUsername"
                  name="username"
                  defaultValue={editingItem.name}
                  required 
                />
                {formErrors.username && <span className="error-message">{formErrors.username}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="editUserEmail">Email:</label>
                <input 
                  type="email" 
                  id="editUserEmail"
                  name="email"
                  defaultValue={editingItem.email}
                  required 
                />
                {formErrors.email && <span className="error-message">{formErrors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="editUserRole">Vai trò:</label>
                <select 
                  id="editUserRole" 
                  name="role"
                  defaultValue={editingItem.role}
                  required
                >
                  <option value="USER">Người dùng</option>
                  <option value="ADMIN">Quản trị viên</option>
                </select>
                {formErrors.role && <span className="error-message">{formErrors.role}</span>}
              </div>
              {/* <div className="form-group">
                <label htmlFor="editUserStatus">Trạng thái:</label>
                <select 
                  id="editUserStatus" 
                  name="status"
                  defaultValue={editingItem.status}
                  required
                >
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Khóa</option>
                </select>
                {formErrors.status && <span className="error-message">{formErrors.status}</span>}
              </div> */}
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setShowEditUser(false)}>Hủy</button>
                <button type="submit" className="submit-button" onClick={()=>{
                  fetch(`http://localhost:8080/user/update/${editingItem.userID}`,{
                    method:"PUT",
                    credentials:"include",
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name:document.getElementById('editUserUsername').value,
                      email:document.getElementById('editUserEmail').value,
                      role: document.getElementById('editUserRole').value
                    })
                  }).catch(e => alert(e));
                  alert("Cập nhật thành công");
                  window.location.reload();
                }}>Lưu thay đổi</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingItem && (
        <div className="modal-overlay">
          <div className="modal delete-confirmation">
            <h3>Xác nhận xóa</h3>
            <p>Bạn có chắc chắn muốn xóa {deletingItem.type === 'story' ? 'truyện' : 
                                          deletingItem.type === 'author' ? 'tác giả' :
                                          deletingItem.type === 'chapter' ? 'chương' : 'người dùng'} này?</p>
            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={() => {
                setDeletingItem(null);
                setShowDeleteStory(false);
                setShowDeleteAuthor(false);
                setShowDeleteChapter(false);
                setShowDeleteUser(false);
              }}>Hủy</button>
              <button type="button" className="delete-button" onClick={confirmDelete}>Xóa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ManageStories = ({ stories, authors, onAdd, onEdit, onDelete ,onFind, currentStoriesPage, totalStoriesPages, setCurrentStoriesPage, storyID,setStoryID }) => {

  const handlePageChange = (pageNumber) => {
    setCurrentStoriesPage(pageNumber);
  };

  const getAuthorName = (authorRoute) => {
    const author = authors.find(a => a.route === authorRoute);
    return author ? author.name : 'Không xác định';
  };
  const genre = {
    "historical-fantasy":"Kỳ ảo lịch sử",
    detective:"Trinh Thám",
    fantasy: "Viễn Tưởng",
    action : "Hành Động",
    romance: "Lãng Mạn",
    science: "Khoa Học",
    satirical:"Trào Phúng"
  }

  const status ={
    stopped: "Đã dừng",
    ongoing: "Đang thực hiện",
    complete: "Hoàn thành"
  }

  return (
    <div className="stories-container">
      <div className="stories-header">
        <h2>Danh sách truyện</h2>
        <div className="header-controls">
          <div className="search-area">
            <input type="text" placeholder="Tìm kiếm theo ID..." className="search-input" value={storyID} onChange={(e)=> setStoryID(e.target.value)}/>
            <button className="search-button" onClick={() => onFind(storyID)}>Tìm</button>
          </div>
          <button className="action-button" onClick={onAdd}>Thêm truyện mới</button>
        </div>
      </div>
      <div className="stories-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên truyện</th>
              <th>Tác giả</th>
              <th>Thể loại</th>
              <th>Mô tả</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {stories.map(story => (
              <tr key={story.id}>
                <td>{story.id}</td>
                <td>{story.name}</td>
                <td>{getAuthorName(story.author)}</td>
                <td>{genre[story.genre]}</td>
                <td className="introduction-cell">{story.anou}</td>
                <td>{status[story.status]}</td>
                <td>
                  <button className="edit-button" onClick={() => onEdit(story)}>Sửa</button>
                  <button className="delete-button" onClick={() => onDelete(story)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button
          className="page-button"
          onClick={() => handlePageChange(currentStoriesPage - 1)}
          disabled={currentStoriesPage === 0}
        >
          Trước
        </button>
        {[...Array(totalStoriesPages)].map((_, index) => (
          <button
            key={index}
            className={`page-button ${currentStoriesPage === index ? 'active' : ''}`}
            onClick={() => handlePageChange(index)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="page-button"
          onClick={() => handlePageChange(currentStoriesPage + 1)}
          disabled={currentStoriesPage === totalStoriesPages - 1}
        >
          Sau
        </button>
      </div>
    </div>
  );
};

const ManageAuthors = ({ authors, onAdd, onEdit, onDelete,onFind , currentAuthorsPage, totalAuthorsPages, setCurrentAuthorsPage,authorID,setAuthorID }) => {
  const handlePageChange = (pageNumber) => {
    setCurrentAuthorsPage(pageNumber);
  };

  return (
    <div className="authors-container">
      <div className="authors-header">
        <h2>Danh sách tác giả</h2>
        <div className="header-controls">
          <div className="search-area">
            <input type="text" placeholder="Tìm kiếm theo ID..." className="search-input" value={authorID} onChange={(e)=> setAuthorID(e.target.value)} />
            <button className="search-button" onClick={() => onFind(authorID)}>Tìm</button>
          </div>
          <button className="action-button" onClick={onAdd}>Thêm tác giả mới</button>
        </div>
      </div>
      <div className="authors-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên tác giả</th>
              <th>Ngày sinh</th>
              <th>Giới thiệu</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {authors.map(author => (
              <tr key={author.id}>
                <td>{author.id}</td>
                <td>{author.name}</td>
                <td>{author.date}</td>
                <td className="introduction-cell">{author.anou}</td>
                <td>
                  <button className="edit-button" onClick={() => onEdit(author)}>Sửa</button>
                  <button className="delete-button" onClick={() => onDelete(author)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button
          className="page-button"
          onClick={() => handlePageChange(currentAuthorsPage - 1)}
          disabled={currentAuthorsPage === 0}
        >
          Trước
        </button>
        {[...Array(totalAuthorsPages)].map((_, index) => (
          <button
            key={index}
            className={`page-button ${currentAuthorsPage === index ? 'active' : ''}`}
            onClick={() => handlePageChange(index)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="page-button"
          onClick={() => handlePageChange(currentAuthorsPage + 1)}
          disabled={currentAuthorsPage === totalAuthorsPages - 1}
        >
          Sau
        </button>
      </div>
    </div>
  );
};

const ManageChapters = ({ chapters, stories, onAdd, onFind, onEdit, onDelete , currentChaptersPage, totalChaptersPages, setCurrentChaptersPage , chapterID, setChapterID}) => {
  const handlePageChange = (pageNumber) => {
    setCurrentChaptersPage(pageNumber);
  };

  const getStoryTitle = (storyId) => {
    const story = stories.find(s => s.id === storyId);
    return story ? story.name : 'Không xác định';
  };

  return (
    <div className="chapters-container">
      <div className="chapters-header">
        <h2>Danh sách chương</h2>
        <div className="header-controls">
          <div className="search-area">
            <input type="text" placeholder="Tìm kiếm theo ID..." className="search-input" value={chapterID} onChange={(e) => setChapterID(e.target.value)}/>
            <button className="search-button" onClick={() => onFind(chapterID)}>Tìm</button>
          </div>
          <button className="action-button" onClick={onAdd}>Thêm chương mới</button>
        </div>
      </div>
      <div className="chapters-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Truyện</th>
              <th>Tên chương</th>
              <th>Chương thứ</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {chapters.map(chapter => (
              <tr key={chapter.id}>
                <td>{chapter.id}</td>
                <td>{getStoryTitle(chapter.novelID)}</td>
                <td>{chapter.title}</td>
                <td>{chapter.chapterNumber}</td>
                <td>
                  {/* <button className="edit-button" onClick={() => onEdit(chapter)}>Sửa</button> */}
                  <button className="delete-button" onClick={() => onDelete(chapter)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button
          className="page-button"
          onClick={() => handlePageChange(currentChaptersPage - 1)}
          disabled={currentChaptersPage === 0}
        >
          Trước
        </button>
        {[...Array(totalChaptersPages)].map((_, index) => (
          <button
            key={index}
            className={`page-button ${currentChaptersPage === index ? 'active' : ''}`}
            onClick={() => handlePageChange(index)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="page-button"
          onClick={() => handlePageChange(currentChaptersPage + 1)}
          disabled={currentChaptersPage === totalChaptersPages - 1}
        >
          Sau
        </button>
      </div>
    </div>
  );
};

const ManageUsers = ({ users, onAdd, onEdit, onDelete ,onFind, currentUsersPage, totalUsersPages, setCurrentUsersPage ,userID,setUserID}) => {

  const handlePageChange = (pageNumber) => {
    setCurrentUsersPage(pageNumber);
  };

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>Danh sách người dùng</h2>
        <div className="header-controls">
          <div className="search-area">
            <input type="text" placeholder="Tìm kiếm theo ID..." className="search-input" value={userID} onChange={(e)=> setUserID(e.target.value)} />
            <button className="search-button" onClick={() => onFind(userID)}>Tìm</button>
          </div>
          <button className="action-button" onClick={onAdd}>Thêm quản trị mới</button>
        </div>
      </div>
      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên người dùng</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.userID}>
                <td>{user.userID}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role === 'ADMIN' ? 'Quản trị viên' : 'Người dùng'}</td>
                <td>
                  <button className="edit-button" onClick={() => onEdit(user)}>Sửa</button>
                  <button className="delete-button" onClick={() => onDelete(user)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button
          className="page-button"
          onClick={() => handlePageChange(currentUsersPage - 1)}
          disabled={currentUsersPage === 0}
        >
          Trước
        </button>
        {[...Array(totalUsersPages)].map((_, index) => (
          <button
            key={index}
            className={`page-button ${currentUsersPage === index ? 'active' : ''}`}
            onClick={() => handlePageChange(index)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="page-button"
          onClick={() => handlePageChange(currentUsersPage + 1)}
          disabled={currentUsersPage === totalUsersPages - 1}
        >
          Sau
        </button>
      </div>
    </div>
  );
};

const Statistics = ({totalStories,totalAuthors,totalUsers,stories}) => {
  return (
    <div className="statistics-container">
      <div className="statistics-header">
        <h2>Thống kê tổng quan</h2>
      </div>
      <div className="statistics-overview">
        <div className="stat-card">
          <h3>Tổng số truyện</h3>
          <p>{totalStories}</p>
        </div>
        <div className="stat-card">
          <h3>Tổng số tác giả</h3>
          <p>{totalAuthors}</p>
        </div>
        <div className="stat-card">
          <h3>Tổng số người dùng</h3>
          <p>{totalUsers}</p>
        </div>
      </div>
      <div className="statistics-details">
        <h3>Thống kê chi tiết theo truyện</h3>
        <div className="statistics-table">
          <table>
            <thead>
              <tr>
                <th>Tên truyện</th>
                <th>Số chương</th>
                <th>Lượt đọc</th>
                <th>Lượt đánh giá</th>
                <th>Đánh giá trung bình</th>
              </tr>
            </thead>
            <tbody>
              {stories.map(story => (
                <tr key={story.id}>
                  <td>{story.name}</td>
                  <td>{story.totalChapter}</td>
                  <td>{story.view}</td>
                  <td>{story.ratings.length}</td>
                  <td>{story.ratings?.length 
        ? (story.ratings.reduce((sum, rating) => sum + rating.rate, 0) / story.ratings.length).toFixed(1) 
        : "Chưa có đánh giá nào"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
