import { Button } from "@material-ui/core";
import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import fr from "timeago.js/lib/lang/fr";
import * as api from "../../apiCall";
import "./Post.scss";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import Updatepost from "../Updatepost/Updatepost";
import Likes from "../Likes/Likes";
import Cookies from "js-cookie";

const Post = ({ post }) => {
  timeago.register("fr", fr);
  //
  // get user connected infos from cookie
  const userOn = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : {
        userId: 0,
        isAdmin: false,
        token: "",
      };

  const id = post.id;
  const postId = id;
  const { data, isLoading, isError } = useQuery(["post-user", { id }], () => api.selectOneUser(post.userId));
  const { data: com } = useQuery(["commentsNumber", postId], () => api.selectCommentsByPost(postId));

  return (
    <div className="Post">
      <div className="top">
        <div className="infos">
          <p>
            Posté par : {isLoading && "..."}
            {isError && "Utilisateur Supprimé"}
            {data && (
              <Link to={`/user/${post.userId}`}>
                <em>
                  {" "}
                  {data[0].firstName} {data[0].lastName}
                </em>
              </Link>
            )}
          </p>
          <p>
            <TimeAgo datetime={`${post.createdAt}`} locale="fr" />
          </p>
        </div>
        <div>{(post.userId === userOn.userId || userOn.isAdmin) && <Updatepost post={post} />}</div>
      </div>

      <hr />

      <div className="content">
        <p className="text">{post.desc}</p>
        {post.image && <img src={post.image} alt="" className="img" loading="lazy" />}
      </div>

      <hr />

      <div className="actions">
        <div>
          <Likes post={post} />
        </div>

        <div>
          <Link to={`/id/${post.id}`}>
            <Button variant="contained" color="primary" size="small">
              Commenter
            </Button>
          </Link>
          <p>({com ? com.length : 0})</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
