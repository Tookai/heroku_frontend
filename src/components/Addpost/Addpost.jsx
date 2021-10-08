import "./Addpost.scss";
import { Button, IconButton } from "@material-ui/core";
import PostAddIcon from "@material-ui/icons/PostAdd";
import Modal from "@material-ui/core/Modal";
import { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as api from "../../apiCall";
import { categories } from "../../resources.js";
import gsap from "gsap";
import Cookies from "js-cookie";

const Addpost = () => {
  //
  // For Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setTopic("");
    setDesc("");
    setImage("");
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
  // Get post data
  const [topic, setTopic] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const userId = userOn.userId;

  //
  // Update feed on submit
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(api.createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("feed");
      setTopic("");
      setDesc("");
      setImage("");
      setOpen(false);
    },
  });
  // Add a post
  const handleSubmit = () => {
    if ((desc !== "" || image !== "") && topic !== "") {
      const post = { topic, desc, image, userId };
      mutate(post);
    } else {
      alert("Certains éléments devraient être remplis.");
    }
  };
  //
  // Gsap Animation
  const roundedBtn = useRef();
  useEffect(() => {
    gsap.fromTo(roundedBtn.current, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.6 });
  }, []);

  return (
    <>
      <div className="Addpost" ref={roundedBtn}>
        <div>
          <IconButton color="primary" onClick={handleOpen}>
            <PostAddIcon fontSize="large" />
          </IconButton>
        </div>
        <p>poster</p>
      </div>

      <Modal open={open} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="post__modal">
          {isLoading ? (
            <p>We are uploading your post ...</p>
          ) : (
            <form>
              <div className="item">
                <p>Topic : </p>
                <select onChange={(e) => setTopic(e.target.value)}>
                  <option value="">*Choisissez votre topic*</option>
                  {categories.map((c) => (
                    <option value={c.topic} key={c.topic}>
                      {c.topic}
                    </option>
                  ))}
                </select>
              </div>

              <div className="item">
                <p>Qu'avez vous en tête ?</p>
                <textarea rows="5" onChange={(e) => setDesc(e.target.value)}></textarea>
              </div>

              <div className="item">
                <p>L'URL de votre image</p>
                <input type="text" onChange={(e) => setImage(e.target.value)} />
              </div>
              <div className="buttons">
                <Button onClick={handleSubmit} variant="contained" color="primary">
                  Poster
                </Button>
                <Button onClick={handleClose} variant="contained" color="secondary">
                  Fermer
                </Button>
              </div>
            </form>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Addpost;
