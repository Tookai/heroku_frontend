import "./Comment.scss";
import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import fr from "timeago.js/lib/lang/fr";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as api from "../../apiCall";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";

const Comment = ({ comment }) => {
  timeago.register("fr", fr);

  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const id = comment.id;
  const { data, isLoading, isError } = useQuery(["post-user", { id }], () => api.selectOneUser(comment.userId));

  const queryClient = useQueryClient();
  const { mutate } = useMutation(api.deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
      queryClient.invalidateQueries("feed");
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
            {data && (
              <Link to={`/user/${comment.userId}`}>
                <em>
                  {" "}
                  {data[0].firstName} {data[0].lastName}
                </em>
              </Link>
            )}
          </p>
          <p>
            <TimeAgo datetime={`${comment.createdAt}`} locale="fr" />
          </p>
        </div>

        {(loggedUser.userId === comment.userId || loggedUser.isAdmin) && (
          <IconButton color="secondary" variant="contained">
            <ClearIcon fontSize="small" onClick={handleDelete} />
          </IconButton>
        )}
      </div>
      <div className="content">{comment.content}</div>
    </div>
  );
};

export default Comment;
