import "./Comment.scss";
import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import fr from "timeago.js/lib/lang/fr";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as api from "../../apiCall";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import Cookies from "js-cookie";

const Comment = ({ comment }) => {
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

  const id = comment.id;
  const { data: comm, isLoading, isError } = useQuery(["comment-user", { id }], () => api.selectOneUser(comment.userId));

  const queryClient = useQueryClient();
  const { mutate } = useMutation(api.deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
      queryClient.invalidateQueries("commentsNumber");
    },
  });

  const handleDelete = () => {
    const postId = comment.postId;
    const commentId = comment.id;
    if (window.confirm("Voulez vous vraiment supprimer ce commentaire ?")) {
      mutate({ postId, commentId });
    }
  };

  return (
    <div className="Comment">
      <div className="infos">
        <div>
          <p>
            Posté par : {isLoading && "..."}
            {isError && "Utilisateur Supprimé"}
            {comm && (
              <Link to={`/user/${comment.userId}`}>
                <em>
                  {" "}
                  {comm[0].firstName} {comm[0].lastName}
                </em>
              </Link>
            )}
          </p>
          <p>
            <TimeAgo datetime={`${comment.createdAt}`} locale="fr" />
          </p>
        </div>

        {(userOn.userId === comment.userId || userOn.isAdmin) && (
          <IconButton color="secondary" variant="contained" onClick={handleDelete}>
            <ClearIcon fontSize="small" />
          </IconButton>
        )}
      </div>
      <div className="content">{comment.content}</div>
    </div>
  );
};

export default Comment;
