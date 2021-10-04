import "./Topicmodal.scss";
import { IconButton } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { categories } from "../../resources.js";

import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import gsap from "gsap";
import { useQueryClient } from "react-query";

const Topicmodal = () => {
  // topic modal marche pas sur heroku

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const queryClient = useQueryClient();
  const refreshFeed = () => {
    queryClient.invalidateQueries("feed");
    setOpen(false);
  };

  //
  // Gsap Animation
  const roundedBtn = useRef();
  useEffect(() => {
    gsap.fromTo(roundedBtn.current, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.6 });
  }, []);

  return (
    <>
      <div className="Topicmodal" ref={roundedBtn}>
        <div>
          <IconButton color="primary" onClick={handleOpen}>
            <FormatListBulletedIcon fontSize="large" />
          </IconButton>
        </div>
        <p>catégories</p>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", overflowY: "scroll" }}
      >
        <div className="topic__modal">
          <div className="container">
            {categories.map((c) => (
              <Link key={c.topic} to={`/topic/${c.topic}`} onClick={refreshFeed}>
                <div className="topic">
                  {c.icon}
                  <h2 className="h2">{c.topic}</h2>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Topicmodal;
