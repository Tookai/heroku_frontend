import "./Addpost.scss";
import { Button, IconButton } from "@material-ui/core";
import PostAddIcon from "@material-ui/icons/PostAdd";
import Modal from "@material-ui/core/Modal";
import { useState, useRef, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as api from "../../apiCall";
import { categories } from "../../resources.js";
import gsap from "gsap";

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
  // Get post data
  const [topic, setTopic] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const userId = loggedUser.userId;
  // const post = { topic, desc, image, userId };
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
      if (typeof image === "string") {
        const post = { topic, desc, image, userId };
        mutate(post);
      }
      if (typeof image === "object") {
        const formData = new FormData();
        formData.append("topic", topic);
        formData.append("desc", desc);
        formData.append("image", image);
        formData.append("userId", userId);
        console.log(formData.get("file"), "formData");
        const post = formData;
        mutate(post);
        // axios.post("https://httpbin.org/anything", post).then((res) => console.log(res));
      }
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

  console.log(image, "image");
  console.log(image.name, "image");
  console.log(typeof image === "object", "typeof");
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
              <label htmlFor="contained-button-file">
                <input
                  className="upload__input"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <Button variant="contained" component="span">
                  Upload
                </Button>
              </label>
              {typeof image === "object" && (
                <div style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}>
                  <p>{image.name}</p>
                  <div style={{ cursor: "pointer" }} onClick={(e) => setImage("")}>
                    X
                  </div>
                </div>
              )}
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
