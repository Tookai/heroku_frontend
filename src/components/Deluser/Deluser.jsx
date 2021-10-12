import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { useState } from "react";
import { useMutation } from "react-query";
import * as api from "../../apiCall";
import "./Deluser.scss";
import Cookies from "js-cookie";

const Deluser = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //
  const verifToken = "je veux supprimer";
  const [verification, setVerification] = useState("");
  //
  const id = parseInt(user.id);
  const { mutate } = useMutation(api.deleteUser, {
    onSuccess: () => {
      Cookies.remove("user");
      setReload(true);
    },
  });

  reload && window.location.reload();

  //
  const handleSubmit = () => {
    if (window.confirm("Vous êtes vraiment sûr de vouloir supprimer votre compte ?")) {
      mutate(id);
    }
  };

  return (
    <div className="Deluser">
      <Button variant="contained" color="secondary" onClick={handleOpen} style={{ margin: "0.3rem" }}>
        Supprimer
        <br /> votre compte
      </Button>

      <Modal open={open} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="pictures__modal">
          <h3>
            La suppression d'un compte est <em>définitive</em>, une fois supprimé vous ne pourrez plus retrouver votre compte.
          </h3>
          <p>Si vous êtes sûr de vous, écrivez "je veux supprimer" dans la case ci-dessous.</p>
          <form>
            <label htmlFor="confirm">Confirmation :</label>
            <input
              type="text"
              id="confirm"
              name="confirm"
              placeholder="Entrez la confirmation ici..."
              onChange={(e) => setVerification(e.target.value)}
            />
          </form>

          <div className="btn__container">
            {verification === verifToken ? (
              <Button variant="contained" color="primary" onClick={handleSubmit} style={{ margin: "0.3rem" }}>
                Confirmer
              </Button>
            ) : (
              <Button disabled variant="contained" style={{ margin: "0.3rem", backgroundColor: "darkblue", color: "#eeeeee" }}>
                J'hésite
              </Button>
            )}

            <Button variant="contained" color="secondary" onClick={handleClose} style={{ margin: "0.3rem" }}>
              Annuler
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Deluser;
