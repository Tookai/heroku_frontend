import "./CommentPage.scss";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Feed from "../../components/Feed/Feed.jsx";
import Commentbox from "../../components/Commentbox/Commentbox";

const CommentPage = () => {
  return (
    <div className="CommentPage">
      <Navbar />
      <div className="container">
        <Feed />
        <Commentbox />
      </div>
    </div>
  );
};

export default CommentPage;
