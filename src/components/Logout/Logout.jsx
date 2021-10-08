import "./Logout.scss";
import { Button, IconButton } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Avatar from "@material-ui/core/Avatar";
import Modal from "@material-ui/core/Modal";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useQuery } from "react-query";
import * as api from "../../apiCall";
import Cookies from "js-cookie";

const Logout = () => {
  const [reload, setReload] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleLogout = () => {
    Cookies.remove("user");
    setReload(true);
  };

  reload && window.location.reload();

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
  // Get current user Data
  const { data } = useQuery("logged-user", () => api.selectOneUser(userOn.userId));

  //
  // Gsap Animation
  const roundedBtn = useRef();
  useEffect(() => {
    gsap.fromTo(roundedBtn.current, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.6 });
  }, []);

  return (
    <>
      <div className="Logout" ref={roundedBtn}>
        <div>
          <IconButton color="default" onClick={handleOpen}>
            <ExitToAppIcon fontSize="large" />
          </IconButton>
        </div>
        <p>déconnecter</p>
      </div>

      <Modal open={open} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="logout__modal">
          <Avatar alt={data[0].firstName} src={data[0].avatar} style={{ height: "250px", width: "250px" }} />
          <p className="username">
            {data[0].firstName} {data[0].lastName}
          </p>

          <h2 className="h2">Vous nous quittez déjà ?</h2>

          <div className="buttons">
            <Button onClick={handleClose} variant="contained" color="primary" style={{ margin: "1rem" }}>
              Non, <br /> c'est une erreur !
            </Button>
            <Button onClick={handleLogout} variant="contained" color="secondary" style={{ margin: "1rem" }}>
              Oui, <br /> j'ai du travail.
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Logout;
