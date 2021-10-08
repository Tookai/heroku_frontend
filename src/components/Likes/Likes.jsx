import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import * as api from "../../apiCall";
import "./Likes.scss";
import Cookies from "js-cookie";

const Likes = ({ post }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //
  // get user connected infos from cookie
  const userOn = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : {
        userId: 0,
        isAdmin: false,
        token: "",
      };

  //
  //
  const { data, isLoading, isError } = useQuery(["likes", post.id], () => api.whoLiked(post.id));
  const body = { postId: post.id, userId: parseInt(userOn.userId) };
  const user = data?.find((id) => id.id === userOn.userId);

  //
  //
  const queryClient = useQueryClient();
  const { mutate: mutateLike } = useMutation(api.addLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(["likes", post.id]);
      queryClient.invalidateQueries("feed");
    },
  });
  //
  const handleLike = () => {
    mutateLike(body);
  };
  //
  //
  const { mutate: mutateDislike } = useMutation(api.removeLike, {
    onSuccess: () => {
      queryClient.invalidateQueries(["likes", post.id]);
      queryClient.invalidateQueries("feed");
    },
  });
  //
  const handleDislike = () => {
    mutateDislike(body);
  };

  if (isLoading) {
    return <div>...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="Likes">
      {!user ? (
        <Button variant="contained" color="primary" size="small" onClick={handleLike}>
          J'aime !
        </Button>
      ) : (
        <Button variant="contained" color="primary" size="small" onClick={handleDislike}>
          Je n'aime plus
        </Button>
      )}

      <p onClick={handleOpen} className="like__number">
        ({data.length})
      </p>

      <Modal open={open} onClick={handleClose} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="likes__modal">
          {data.length === 0 ? (
            <p>Aucun like pour le moment.</p>
          ) : (
            data.map((u) => (
              <Link to={`/user/${u.id}`} key={u.id}>
                <p>
                  {u.firstName} {u.lastName}
                </p>
              </Link>
            ))
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Likes;
