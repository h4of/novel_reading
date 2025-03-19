import "./Home.css";
import Header from "../components/Header";
import Footer from "../components/Footer.jsx";
import ImageSlider from "../components/ImageSlider";
import NovelComponent from "../components/NovelComponent.jsx";
import { Novels } from "../data.js";

const Home = () => {
  const imgURL = [
    {
      img: "/img/con-cho-cua-dong-ho-baskerville-s.png",
      route: "con-cho-cua-dong-ho-baskerville",
    },
    {
      img: "/img/tat-den-s.png",
      route: "tat-den",
    },
    {
      img: "/img/tower-of-god-s.png",
      route: "tower-of-god",
    },
    {
      img: "/img/tam-quoc-dien-nghia-s.png",
      route: "tam-quoc-dien-nghia",
    },
  ];
  // useEffect(() => {
  //   window.location.scrol(0, 0);
  // });
  return (
    <div className="container">
      <Header />
      <ImageSlider ImgURL={imgURL} />
      <div className="text-rating">
        <h2>Truyện mới cập nhật</h2>
      </div>
      <div className="novel-high-rating">
        {Novels.map((novel) => (
          <NovelComponent
            novel_image={novel.img}
            novel_name={novel.name}
            novel_path={novel.route}
          />
        ))}
      </div>
      <div className="text-rating">
        <h2>Truyện được đánh giá cao</h2>
      </div>
      <div className="novel-high-rating">
        {Novels.map((novel) => (
          <NovelComponent
            novel_image={novel.img}
            novel_name={novel.name}
            novel_path={novel.route}
          />
        ))}
      </div>
      <div className="text-rating">
        <h2>Truyện mới</h2>
      </div>
      <div className="novel-high-rating">
        {Novels.map((novel) => (
          <NovelComponent
            novel_image={novel.img}
            novel_name={novel.name}
            novel_path={novel.route}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
