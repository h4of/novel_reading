import "./Home.css";
import Header from "../components/Header";
import ImageSlider from "../components/ImageSlider";
import user from "/user.png";
import logo from "/logo.svg";
import limg1 from "/loginImage1.svg";
import limg2 from "/loginImage2.svg";
import NovelComponent from "../components/NovelComponent";

const Home = () => {
  const imgURL = [user, logo, limg1, limg2];
  return (
    <div>
      <Header />
      <ImageSlider ImgURL={imgURL} />
      <div className="text-rating">
        <h2>Truyện được đánh giá cao</h2>
      </div>
      <div className="novel-high-rating">
        <NovelComponent />
        <NovelComponent />
        <NovelComponent />
        <NovelComponent />
        <NovelComponent />
      </div>
    </div>
  );
};

export default Home;
