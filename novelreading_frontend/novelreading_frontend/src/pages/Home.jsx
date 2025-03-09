import React from "react";
import user from "../assets/images/user.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Profile from "./Profile";
import Story from "../components/Novel";

const Home = () => {
  return (
    <div className="container">
      <Profile />
    </div>
  );
};

export default Home;
