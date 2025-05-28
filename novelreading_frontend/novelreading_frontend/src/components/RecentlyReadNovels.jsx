import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecentlyReadNovels.css';

const RecentlyReadNovels = ({ novels, currentPage, totalPages, onPageChange }) => {
  const navigate = useNavigate();
  const folderPath = "http://localhost:8080/data/image";

  const handleNovelClick = ( route , chapterReading) => {
    navigate(`/novel/${route}/chuong-${chapterReading}`);
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
    );

    // First page
    if (startPage > 1) {
      pages.push(
        <button
          key="1"
          className="pagination-button"
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(<span key="start-ellipsis" className="pagination-ellipsis">...</span>);
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-button ${currentPage === i ? 'active' : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="end-ellipsis" className="pagination-ellipsis">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          className="pagination-button"
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    );

    return pages;
  };

  return (
    <div className="recently-read-container">
      <h2 className="section-title">Truyện đọc gần đây</h2>
      <div className="novels-grid">
        {novels && novels.length > 0 ? (
          novels.map((novel) => (
            <div 
              key={novel.id} 
              className="novel-card"
              onClick={() => handleNovelClick(novel.novelRoute,novel.chapterReading)}
            >
              <img src={folderPath+"/"+novel.novelRoute+".png"} alt={novel.novelName} className="novel-cover" />
              <div className="novel-info">
                <h3 className="novel-title">{novel.novelName}</h3>
                <p className="novel-author">Đang đọc ở Chương {novel.chapterReading}</p>
                <p className="last-read">Đọc lần cuối: {new Date(novel.readAt).toLocaleDateString("vi-VN")}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-novels">Chưa có truyện nào được đọc gần đây</p>
        )}
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          {renderPagination()}
        </div>
      )}
    </div>
  );
};

export default RecentlyReadNovels; 