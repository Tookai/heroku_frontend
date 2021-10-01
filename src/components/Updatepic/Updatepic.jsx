import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as api from "../../apiCall";
import "./Updatepic.scss";

import axios from "axios";

const Updatepic = ({ user }) => {
  //
  //
  const [coverPic, setCoverPic] = useState("");
  coverPic === "" && setCoverPic(user.cover);
  const [avatarPic, setAvatarPic] = useState("");
  avatarPic === "" && setAvatarPic(user.avatar);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setCoverPic("");
    setAvatarPic("");
  };

  //
  //
  const id = parseInt(user.id);
  const queryClient = useQueryClient();
  const { mutate: mutateAvatar } = useMutation(api.updateUserAvatar, {
    onSuccess: () => {
      queryClient.invalidateQueries("profile-user");
      queryClient.invalidateQueries("logged-user");
      setOpen(false);
    },
  });
  const { mutate: mutateCover } = useMutation(api.updateUserCover, {
    onSuccess: () => {
      queryClient.invalidateQueries("profile-user");
      queryClient.invalidateQueries("logged-user");
      setOpen(false);
    },
  });

  //
  const handleSubmit = () => {
    if (typeof avatarPic === "string" && typeof coverPic === "string") {
      const bodyA = { id, avatar: { avatarPic } };
      mutateAvatar(bodyA);
      const bodyC = { id, cover: { coverPic } };
      mutateCover(bodyC);
    }
    if (typeof avatarPic === "object" && typeof coverPic === "string") {
      console.log(typeof avatarPic, "avatar");
      console.log(typeof coverPic, "cover");
      const bodyC = { id, cover: { coverPic } };
      mutateCover(bodyC);
      //
      const avatar = new FormData();
      avatar.append("image", avatarPic);
      const bodyA = { id, avatar };
      mutateAvatar(bodyA);
    }
    if (typeof avatarPic === "string" && typeof coverPic === "object") {
      const bodyA = { id, avatar: { avatarPic } };
      mutateAvatar(bodyA);
      //
      const cover = new FormData();
      cover.append("image", coverPic);
      const bodyC = { id, cover };
      mutateCover(bodyC);
    }
    if (typeof avatarPic === "object" && typeof coverPic === "object") {
      const avatar = new FormData();
      avatar.append("image", avatarPic);
      const bodyA = { id, avatar };
      mutateAvatar(bodyA);
      //
      const cover = new FormData();
      cover.append("image", coverPic);
      const bodyC = { id, cover };
      mutateCover(bodyC);
    }
  };

  return (
    <div className="Updatepic">
      <Button variant="contained" color="primary" onClick={handleOpen} style={{ margin: "0.3rem" }}>
        Mettre à jour
        <br /> vos photos
      </Button>

      <Modal open={open} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="pictures__modal">
          <form>
            <label htmlFor="cover">Cover :</label>
            <input
              type="text"
              id="cover"
              name="cover"
              placeholder="Mettez l'URL de votre nouvelle photo de couverture ici..."
              onChange={(e) => setCoverPic(e.target.value)}
            />
            <label htmlFor="contained-button-file1">
              <input
                onChange={(e) => setCoverPic(e.target.files[0])}
                accept="image/*"
                id="contained-button-file1"
                multiple
                type="file"
                className="upload__input"
              />
              <Button variant="contained" component="span">
                Upload Cover
              </Button>
              {typeof coverPic === "object" && (
                <div style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}>
                  <p>{coverPic.name}</p>
                  <div style={{ cursor: "pointer" }} onClick={(e) => setCoverPic("")}>
                    X
                  </div>
                </div>
              )}
            </label>

            <label htmlFor="avatar">Avatar :</label>
            <input
              type="text"
              id="avatar"
              name="avatar"
              placeholder="Mettez l'URL de votre nouvelle photo de profil ici..."
              onChange={(e) => setAvatarPic(e.target.value)}
            />
            <label htmlFor="contained-button-file2">
              <input
                onChange={(e) => setAvatarPic(e.target.files[0])}
                accept="image/*"
                id="contained-button-file2"
                multiple
                type="file"
                className="upload__input"
              />
              <Button variant="contained" component="span">
                Upload Avatar
              </Button>
              {typeof avatarPic === "object" && (
                <div style={{ display: "flex", justifyContent: "space-evenly", width: "100%" }}>
                  <p>{avatarPic.name}</p>
                  <div style={{ cursor: "pointer" }} onClick={(e) => setAvatarPic("")}>
                    X
                  </div>
                </div>
              )}
            </label>
          </form>

          <div className="btn__container">
            <Button variant="contained" color="primary" onClick={handleSubmit} style={{ margin: "0.3rem" }}>
              Mettre à jour
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose} style={{ margin: "0.3rem" }}>
              Annuler
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Updatepic;
