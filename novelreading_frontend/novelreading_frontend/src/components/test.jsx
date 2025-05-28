import React, { useState } from "react";
import './test.css';

// Common Components
const Modal = ({ title, onClose, children }) => (
  <div className="modal-overlay">
    <div className="modal">
      <h3>{title}</h3>
      {children}
    </div>
  </div>
);

const FormGroup = ({ label, id, error, children }) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    {children}
    {error && <span className="error-message">{error}</span>}
  </div>
);

const ImageUpload = ({ id, preview, onUpload, onRemove }) => (
  <div className="image-upload-container">
    <input 
      type="file" 
      id={id}
      name="image"
      accept="image/*"
      onChange={onUpload}
      className="image-upload-input"
    />
    <label htmlFor={id} className="image-upload-label">
      {preview ? 'Thay đổi ảnh' : 'Chọn ảnh'}
    </label>
    {preview && (
      <div className="image-preview-container">
        <img src={preview} alt="Preview" className="image-preview" />
        <button 
          type="button" 
          className="remove-image-button"
          onClick={onRemove}
        >
          ×
        </button>
      </div>
    )}
  </div>
);

const FormActions = ({ onCancel, submitText = 'Lưu' }) => (
  <div className="form-actions">
    <button type="button" className="cancel-button" onClick={onCancel}>Hủy</button>
    <button type="submit" className="submit-button">{submitText}</button>
  </div>
);

// Management Components
const DataTable = ({ columns, data, onEdit, onDelete }) => (
  <div className="data-table">
    <table>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.key}>{col.label}</th>
          ))}
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            {columns.map(col => (
              <td key={col.key} className={col.className}>
                {col.render ? col.render(item[col.key], item) : item[col.key]}
              </td>
            ))}
            <td>
              <button className="edit-button" onClick={() => onEdit(item)}>Sửa</button>
              <button className="delete-button" onClick={() => onDelete(item)}>Xóa</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("stories");
  
  // States for Stories
  const [showAddStory, setShowAddStory] = useState(false);
  const [showEditStory, setShowEditStory] = useState(false);
  const [showDeleteStory, setShowDeleteStory] = useState(false);
  
  // States for Authors
  const [showAddAuthor, setShowAddAuthor] = useState(false);
  const [showEditAuthor, setShowEditAuthor] = useState(false);
  const [showDeleteAuthor, setShowDeleteAuthor] = useState(false);
  
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
  const [stories, setStories] = useState([
    { id: 1, title: 'Truyện 1', authorId: 1, status: 'Đang tiến hành' },
    { id: 2, title: 'Truyện 2', authorId: 2, status: 'Hoàn thành' },
  ]);

  const [authors, setAuthors] = useState([
    { 
      id: 1, 
      name: 'Nguyễn Văn A', 
      introduction: 'Tác giả nổi tiếng với nhiều tác phẩm best-seller',
      birthDate: '1980-01-15'
    },
    { 
      id: 2, 
      name: 'Trần Thị B', 
      introduction: 'Tác giả trẻ với phong cách viết độc đáo',
      birthDate: '1990-05-20'
    },
    { 
      id: 3, 
      name: 'Lê Văn C', 
      introduction: 'Tác giả chuyên về thể loại tiểu thuyết lịch sử',
      birthDate: '1975-12-30'
    },
    { 
      id: 4, 
      name: 'Phạm Thị D', 
      introduction: 'Tác giả với nhiều giải thưởng văn học',
      birthDate: '1985-08-25'
    },
  ]);

  const [chapters, setChapters] = useState([
    { id: 1, storyId: 1, title: 'Chương 1', content: 'Nội dung chương 1...', order: 1 },
    { id: 2, storyId: 1, title: 'Chương 2', content: 'Nội dung chương 2...', order: 2 },
    { id: 3, storyId: 2, title: 'Chương 1', content: 'Nội dung chương 1...', order: 1 },
  ]);

  const [users, setUsers] = useState([
    { id: 1, username: 'user1', email: 'user1@email.com', role: 'user', status: 'active' },
    { id: 2, username: 'user2', email: 'user2@email.com', role: 'user', status: 'active' },
    { id: 3, username: 'admin1', email: 'admin1@email.com', role: 'admin', status: 'active' },
  ]);

  // Form validation states
  const [formErrors, setFormErrors] = useState({});

  // States for editing
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);

  const validateForm = (formData) => {
    const errors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key] || formData[key].trim() === '') {
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

    const errors = validateForm(data);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

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
    // Xử lý đăng xuất ở đây
    // Ví dụ: xóa token, clear session, redirect về trang login
    console.log('Đăng xuất...');
    // window.location.href = '/login'; // Uncomment khi có trang login
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

  // Confirm delete
  const confirmDelete = () => {
    if (!deletingItem) return;

    switch (deletingItem.type) {
      case 'story':
        setStories(stories.filter(s => s.id !== deletingItem.id));
        break;
      case 'author':
        setAuthors(authors.filter(a => a.id !== deletingItem.id));
        break;
      case 'chapter':
        setChapters(chapters.filter(c => c.id !== deletingItem.id));
        break;
      case 'user':
        setUsers(users.filter(u => u.id !== deletingItem.id));
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
          u.id === editingItem.id ? { ...u, ...data } : u
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
          />
        );
      case "authors":
        return (
          <ManageAuthors 
            authors={authors}
            onAdd={() => setShowAddAuthor(true)}
            onEdit={(item) => handleEdit(item, 'author')}
            onDelete={(item) => handleDelete(item, 'author')}
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
          />
        );
      case "users":
        return (
          <ManageUsers 
            users={users}
            onAdd={() => setShowAddUser(true)}
            onEdit={(item) => handleEdit(item, 'user')}
            onDelete={(item) => handleDelete(item, 'user')}
          />
        );
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
          <div className="sidebar-divider"></div>
          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Đăng xuất
          </button>
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
                <select id="storyAuthor" name="authorId" required>
                  <option value="">Chọn tác giả</option>
                  {authors.map(author => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
                {formErrors.authorId && <span className="error-message">{formErrors.authorId}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="storyGenre">Thể loại:</label>
                <select id="storyGenre" name="genre" required>
                  <option value="">Chọn thể loại</option>
                  <option value="action">Hành động</option>
                  <option value="romance">Tình cảm</option>
                  <option value="fantasy">Fantasy</option>
                </select>
                {formErrors.genre && <span className="error-message">{formErrors.genre}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="storyDescription">Mô tả:</label>
                <textarea 
                  id="storyDescription"
                  name="description"
                  placeholder="Nhập mô tả truyện"
                  required
                ></textarea>
                {formErrors.description && <span className="error-message">{formErrors.description}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="storyStatus">Trạng thái:</label>
                <select id="storyStatus" name="status" required>
                  <option value="ongoing">Đang tiến hành</option>
                  <option value="completed">Hoàn thành</option>
                </select>
                {formErrors.status && <span className="error-message">{formErrors.status}</span>}
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setShowAddStory(false)}>Hủy</button>
                <button type="submit" className="submit-button">Thêm truyện</button>
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
                  type="date" 
                  id="authorBirthDate"
                  name="birthDate"
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
                <button type="submit" className="submit-button">Thêm tác giả</button>
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
                      {story.title}
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
                <textarea 
                  id="chapterContent"
                  name="content"
                  placeholder="Nhập nội dung chương"
                  required
                ></textarea>
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
                <button type="submit" className="submit-button">Thêm chương</button>
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
                <label htmlFor="userUsername">Tên người dùng:</label>
                <input 
                  type="text" 
                  id="userUsername"
                  name="username"
                  placeholder="Nhập tên người dùng" 
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
                  <option value="user">Người dùng</option>
                  <option value="admin">Quản trị viên</option>
                </select>
                {formErrors.role && <span className="error-message">{formErrors.role}</span>}
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setShowAddUser(false)}>Hủy</button>
                <button type="submit" className="submit-button">Thêm người dùng</button>
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
                  defaultValue={editingItem.title}
                  required 
                />
                {formErrors.title && <span className="error-message">{formErrors.title}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="editStoryAuthor">Tác giả:</label>
                <select 
                  id="editStoryAuthor" 
                  name="authorId" 
                  defaultValue={editingItem.authorId}
                  required
                >
                  <option value="">Chọn tác giả</option>
                  {authors.map(author => (
                    <option key={author.id} value={author.id}>
                      {author.name}
                    </option>
                  ))}
                </select>
                {formErrors.authorId && <span className="error-message">{formErrors.authorId}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="editStoryStatus">Trạng thái:</label>
                <select 
                  id="editStoryStatus" 
                  name="status"
                  defaultValue={editingItem.status}
                  required
                >
                  <option value="ongoing">Đang tiến hành</option>
                  <option value="completed">Hoàn thành</option>
                </select>
                {formErrors.status && <span className="error-message">{formErrors.status}</span>}
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setShowEditStory(false)}>Hủy</button>
                <button type="submit" className="submit-button">Lưu thay đổi</button>
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
                <label htmlFor="editAuthorBirthDate">Ngày sinh:</label>
                <input 
                  type="date" 
                  id="editAuthorBirthDate"
                  name="birthDate"
                  defaultValue={editingItem.birthDate}
                  required 
                />
                {formErrors.birthDate && <span className="error-message">{formErrors.birthDate}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="editAuthorIntroduction">Giới thiệu:</label>
                <textarea 
                  id="editAuthorIntroduction"
                  name="introduction"
                  defaultValue={editingItem.introduction}
                  rows="4"
                  required
                ></textarea>
                {formErrors.introduction && <span className="error-message">{formErrors.introduction}</span>}
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setShowEditAuthor(false)}>Hủy</button>
                <button type="submit" className="submit-button">Lưu thay đổi</button>
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
                      {story.title}
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
                <textarea 
                  id="editChapterContent"
                  name="content"
                  defaultValue={editingItem.content}
                  rows="6"
                  required
                ></textarea>
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
                <button type="submit" className="submit-button">Lưu thay đổi</button>
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
                  defaultValue={editingItem.username}
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
                  <option value="user">Người dùng</option>
                  <option value="admin">Quản trị viên</option>
                </select>
                {formErrors.role && <span className="error-message">{formErrors.role}</span>}
              </div>
              <div className="form-group">
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
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setShowEditUser(false)}>Hủy</button>
                <button type="submit" className="submit-button">Lưu thay đổi</button>
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

const SectionContainer = ({ title, children }) => (
  <div className="section-container">
    <h2>{title}</h2>
    <div className="action-buttons">
      {children}
    </div>
  </div>
);

const ManageStories = ({ stories, authors, onAdd, onEdit, onDelete }) => {
  const getAuthorName = (authorId) => {
    const author = authors.find(a => a.id === authorId);
    return author ? author.name : 'Không xác định';
  };

  return (
    <div className="stories-container">
      <div className="stories-header">
        <h2>Danh sách truyện</h2>
        <button className="action-button" onClick={onAdd}>Thêm truyện mới</button>
      </div>
      <div className="stories-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên truyện</th>
              <th>Tác giả</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {stories.map(story => (
              <tr key={story.id}>
                <td>{story.id}</td>
                <td>{story.title}</td>
                <td>{getAuthorName(story.authorId)}</td>
                <td>{story.status}</td>
                <td>
                  <button className="edit-button" onClick={() => onEdit(story, 'story')}>Sửa</button>
                  <button className="delete-button" onClick={() => onDelete(story, 'story')}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ManageAuthors = ({ authors, onAdd, onEdit, onDelete }) => {
  // Hàm format ngày tháng
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  return (
    <div className="authors-container">
      <div className="authors-header">
        <h2>Danh sách tác giả</h2>
        <button className="action-button" onClick={onAdd}>Thêm tác giả mới</button>
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
                <td>{formatDate(author.birthDate)}</td>
                <td className="introduction-cell">{author.introduction}</td>
                <td>
                  <button className="edit-button" onClick={() => onEdit(author, 'author')}>Sửa</button>
                  <button className="delete-button" onClick={() => onDelete(author, 'author')}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ManageChapters = ({ chapters, stories, onAdd, onEdit, onDelete }) => {
  const getStoryTitle = (storyId) => {
    const story = stories.find(s => s.id === storyId);
    return story ? story.title : 'Không xác định';
  };

  return (
    <div className="chapters-container">
      <div className="chapters-header">
        <h2>Danh sách chương</h2>
        <button className="action-button" onClick={onAdd}>Thêm chương mới</button>
      </div>
      <div className="chapters-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Truyện</th>
              <th>Tên chương</th>
              <th>Thứ tự</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {chapters.map(chapter => (
              <tr key={chapter.id}>
                <td>{chapter.id}</td>
                <td>{getStoryTitle(chapter.storyId)}</td>
                <td>{chapter.title}</td>
                <td>{chapter.order}</td>
                <td>
                  <button className="edit-button" onClick={() => onEdit(chapter, 'chapter')}>Sửa</button>
                  <button className="delete-button" onClick={() => onDelete(chapter, 'chapter')}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ManageUsers = ({ users, onAdd, onEdit, onDelete }) => (
  <div className="users-container">
    <div className="users-header">
      <h2>Danh sách người dùng</h2>
      <button className="action-button" onClick={onAdd}>Thêm người dùng mới</button>
    </div>
    <div className="users-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên người dùng</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}</td>
              <td>{user.status === 'active' ? 'Hoạt động' : 'Khóa'}</td>
              <td>
                <button className="edit-button" onClick={() => onEdit(user, 'user')}>Sửa</button>
                <button className="delete-button" onClick={() => onDelete(user, 'user')}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default AdminDashboard;
