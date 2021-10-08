import { Button, TextField } from "@material-ui/core";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Comment from "../Comment/Comment";
import * as api from "../../apiCall";
import "./Commentbox.scss";
import { useState } from "react";
import Cookies from "js-cookie";

const Commentbox = () => {
  //
  // get user connected infos from cookie
  const userOn = Cookies.get("user")
    ? JSON.parse(Cookies.get("user"))
    : {
        userId: 0,
        isAdmin: false,
        token: "",
      };

  const userId = userOn.userId;
  const postId = window.location.pathname.split("/id/")[1];
  const { data, isLoading, isError } = useQuery(["comments", postId], () => api.selectCommentsByPost(postId));

  const [content, setContent] = useState("");

  const queryClient = useQueryClient();
  const { mutate } = useMutation(api.createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]);
      queryClient.invalidateQueries("commentsNumber");
    },
  });
  //
  const handleComment = (e) => {
    e.preventDefault();
    const body = { postId, userId, content };
    if (content !== "") {
      mutate(body);
      setContent("");
    } else {
      alert("Vous essayez de poster un commentaire vide.");
    }
  };

  if (isLoading) {
    return <div>...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="Commentbox">
      {data?.map((c, id) => (
        <Comment key={id} comment={c} />
      ))}
      <form>
        <TextField
          id="content"
          multiline
          label="Laisser un commentaire : "
          value={content}
          rows={4}
          variant="filled"
          style={{ backgroundColor: "white", border: "none", outline: "none", marginBottom: "0.3rem", minWidth: "300px" }}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit" onClick={handleComment}>
          Envoyer
        </Button>
      </form>
    </div>
  );
};

export default Commentbox;
