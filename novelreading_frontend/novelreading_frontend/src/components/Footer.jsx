import "./Footer.css";
import facebook from "../assets/images/facebook.png";
import X from "../assets/images/X.png";
import In from "../assets/images/In.png";
import Instagram from "../assets/images/Instagram.png";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="infomation">
        <ul className="footer-list">
          <li className="header-choose">Company</li>
          <li className="choose">About us</li>
          <li className="choose">Careers</li>
          <li className="choose">Terms</li>
          <li className="choose">Privary</li>
          <li className="choose">Interest Based Ads</li>
          <li className="choose">Ads Preferences</li>
          <li className="choose">Help</li>
        </ul>
        <ul className="footer-list">
          <li className="header-choose">Work with us</li>
          <li className="choose">Authors</li>
          <li className="choose">Advertise</li>
          <li className="choose">Author & Ads blog</li>
          <li className="choose">API</li>
        </ul>
        <ul className="footer-list">
          <li className="header-choose">Contact</li>
          <li className="icon">
            <img src={facebook} alt=""></img>
            <img src={X} alt="" />
            <img src={In} alt="" />
            <img src={Instagram} alt="" />
          </li>
        </ul>
        <ul className="footer-list">
          <li className="header-choose">Suport</li>
          <li className="choose">FAQ</li>
          <li className="choose">Search Guide</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
