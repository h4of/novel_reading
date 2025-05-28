import { useState, useEffect } from "react";
import AuthorComponent from "../components/AuthorComponent.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

const Author = () => {
  const folderPath = "http://localhost:8080/data/image";
  const [authors, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8080/author/getAll?page=${currentPage}&size=12`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setAuthors(data.content);
        setTotalPages(data.totalPages);
      });
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <Header />
      <br />
      <h2>Danh sách tác giả</h2>
      <div className="authors-list">
        {authors.map((author) => (
          <AuthorComponent
            key={author.id}
            author_img={folderPath + `/${author.route}.png`}
            author_name={author.name}
            author_path={author.route}
          />
        ))}
      </div>
      <div className="pagination">
        <button
          className="page-button"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Trước
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`page-button ${currentPage === index ? "active" : ""}`}
            onClick={() => handlePageChange(index)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="page-button"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          Sau
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Author;
