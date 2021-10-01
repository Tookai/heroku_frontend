import Feed from "../../components/Feed/Feed";
import Navbar from "../../components/Navbar/Navbar";
import Userinfos from "../../components/Userinfos/Userinfos";
import "./UserPage.scss";

const UserPage = () => {
  return (
    <div className="UserPage">
      <Navbar />
      <div className="container">
        <Userinfos />
        <Feed />
      </div>
    </div>
  );
};

export default UserPage;
