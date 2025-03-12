import Header from "../components/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="slider">
        <input type="radio" name="slider" id="input1" checked></input>
        <input type="radio" name="slider" id="input1"></input>
        <input type="radio" name="slider" id="input1"></input>
        <input type="radio" name="slider" id="input1"></input>
      </div>
    </div>
  );
};

export default Home;
