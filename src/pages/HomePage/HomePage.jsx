import "./HomePage.scss";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Feed from "../../components/Feed/Feed.jsx";

const HomePage = () => {

  return (
    <div className="HomePage">
      <Navbar />
      <div className="flex">

          <Feed />

      </div>
    </div>
  );
};

export default HomePage;
