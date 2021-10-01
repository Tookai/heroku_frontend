import { Button } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as api from "../../apiCall";
import "./Updateinfos.scss";

const Updateinfos = ({ user }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //
  //
  const [firstName, setFirstName] = useState("");
  firstName === "" && setFirstName(user.firstName);
  //
  const [lastName, setLastName] = useState("");
  lastName === "" && setLastName(user.lastName);
  //
  const [birthday, setBirthday] = useState("");
  birthday === "" && setBirthday(user.birthday);
  //
  const [job, setJob] = useState("");
  job === "" && setJob(user.job);
  //
  const [city, setCity] = useState("");
  city === "" && setCity(user.city);
  //
  const [fromCity, setFromCity] = useState("");
  fromCity === "" && setFromCity(user.fromCity);
  //
  const [scholarship, setScholarship] = useState("");
  scholarship === "" && setScholarship(user.scholarship);
  //
  const [relationship, setRelationship] = useState("");
  relationship === "" && setRelationship(user.relationship);
  //
  const [email, setEmail] = useState(null);
  const [oldPw, setOldPw] = useState(null);
  const [newPw, setNewPw] = useState(null);
  //
  const id = parseInt(user.id);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(api.updateUserInfos, {
    onSuccess: () => {
      queryClient.invalidateQueries("profile-user");
      queryClient.invalidateQueries("logged-user");
      setOpen(false);
    },
  });
  //
  const { mutate: mutation } = useMutation(api.updateUserCredentials, {
    onSuccess: () => {
      queryClient.invalidateQueries("profile-user");
      queryClient.invalidateQueries("logged-user");
      setOpen(false);
    },
    onError: (error) => {
      alert("Votre mot de passe actuel est erroné.");
    },
  });

  //
  const handleInfos = () => {
    const user = { firstName, lastName, birthday, job, city, fromCity, scholarship, relationship };
    const body = { id, user };
    mutate(body);
  };
  //
  const handleCredentials = (e) => {
    e.preventDefault();
    const cred = { email, newPw, oldPw };
    const body = { id, cred };
    mutation(body);
  };

  return (
    <div className="Updateinfos">
      <Button variant="contained" color="primary" onClick={handleOpen} style={{ margin: "0.3rem" }}>
        Mettre à jour <br /> vos infos
      </Button>

      <Modal open={open} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="infos__modal">
          <form>
            <div className="col">
              <label htmlFor="firstName">Prénom :</label>
              <input type="text" id="firstName" name="firstName" placeholder="Prénom" onChange={(e) => setFirstName(e.target.value)} />

              <label htmlFor="lastName">Nom :</label>
              <input type="text" id="lastName" name="lastName" placeholder="Nom de famille" onChange={(e) => setLastName(e.target.value)} />
              <label htmlFor="birthday">Date de naissance :</label>
              <input type="text" id="birthday" name="birthday" placeholder="JJ/MM/AAAA" onChange={(e) => setBirthday(e.target.value)} />

              <label htmlFor="job">Métier :</label>
              <input type="text" id="job" name="job" placeholder="Métier" onChange={(e) => setJob(e.target.value)} />
            </div>
            <div className="col">
              <label htmlFor="city">Ville :</label>
              <input type="text" id="city" name="city" placeholder="Ville" onChange={(e) => setCity(e.target.value)} />

              <label htmlFor="fromCity">Origine :</label>
              <input
                type="text"
                id="fromCity"
                name="fromCity"
                placeholder="Ville d'origine"
                onChange={(e) => setFromCity(e.target.value)}
              />
              <label htmlFor="scholarship">Scolarité :</label>
              <input
                type="text"
                id="scholarship"
                name="scholarship"
                placeholder="Où avez vous étudiez ?"
                onChange={(e) => setScholarship(e.target.value)}
              />

              <label htmlFor="relationship">Situation amoureuse :</label>
              <input
                type="text"
                id="relationship"
                name="relationship"
                placeholder="Votre situation"
                onChange={(e) => setRelationship(e.target.value)}
              />
            </div>
          </form>

          <div className="btn__container">
            <Button variant="contained" color="primary" onClick={handleInfos} style={{ margin: "0.3rem" }}>
              Mettre à jour
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose} style={{ margin: "0.3rem" }}>
              Annuler
            </Button>
          </div>

          <div className="cred">
            <form>
              <label htmlFor="email">Nouvel Email :</label>
              <input type="email" id="email" name="email" placeholder="Votre nouvel email." onChange={(e) => setEmail(e.target.value)} />

              <label htmlFor="newPw">Nouveau mot de passe :</label>
              <input
                type="password"
                id="newPw"
                name="newPw"
                placeholder="Votre nouveau mot de passe."
                onChange={(e) => setNewPw(e.target.value)}
              />

              <label htmlFor="oldPw">Mot de passe :</label>
              <input
                required
                type="password"
                id="oldPw"
                name="oldPw"
                placeholder="Votre mot de passe actuel."
                onChange={(e) => setOldPw(e.target.value)}
              />

              <div className="btn__container">
                <Button variant="contained" color="primary" type="submit" onClick={handleCredentials} style={{ margin: "0.3rem" }}>
                  Mettre à jour
                </Button>
                <Button variant="contained" color="secondary" onClick={handleClose} style={{ margin: "0.3rem" }}>
                  Annuler
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Updateinfos;
