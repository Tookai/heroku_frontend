import "./Users.scss";
import { IconButton } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import Avatar from "@material-ui/core/Avatar";
import Modal from "@material-ui/core/Modal";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useQuery, useQueryClient } from "react-query";
import * as api from "../../apiCall";
import { Link } from "react-router-dom";

const Users = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //
  // Gsap Animation
  const roundedBtn = useRef();
  useEffect(() => {
    gsap.fromTo(roundedBtn.current, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.6 });
  }, []);

  //
  // Fetch users
  const { data } = useQuery("user", api.selectAllUsers);

  //
  // Refetch data on user change
  const queryClient = useQueryClient();
  const handleClick = () => {
    queryClient.invalidateQueries("profile-user");
    queryClient.invalidateQueries("feed");
  };

  return (
    <>
      <div className="Users" ref={roundedBtn}>
        <div>
          <IconButton color="primary" onClick={handleOpen}>
            <PeopleIcon fontSize="large" />
          </IconButton>
        </div>
        <p>utilisateurs</p>
      </div>

      <Modal open={open} onClose={handleClose} style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
        <div className="users__modal">
          <div className="container">
            {data?.map((user) => (
              <Link to={`/user/${user.id}`} onClick={handleClick} key={user.id}>
                <div className="user">
                  <Avatar alt={`${user.firstName} Avatar`} src={user.avatar} />
                  <p className="username">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Users;
