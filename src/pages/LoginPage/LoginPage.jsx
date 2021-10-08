import "./LoginPage.scss";
import stackedLogo from "../../images/stackedLogo.svg";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "react-query";
import * as api from "../../apiCall";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [reload, setReload] = useState(false);

  const { mutate } = useMutation(api.loginUser, {
    onSuccess: (data) => {
      const user = { userId: data.user[0].id, isAdmin: data.user[0].isAdmin, token: data.token };
      Cookies.set("user", JSON.stringify(user), { expires: 0.125 });
      setReload(true);
    },
    onError: () => {
      alert("L'identifiant ou le mot de passe est incorrect.");
    },
  });

  reload && window.location.reload();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== "" && email !== "") {
      const user = { email, password };
      mutate(user);
    } else {
      alert("Les champs doivent être remplis.");
    }
  };

  return (
    <div className="LoginPage">
      <div className="left">
        <img src={stackedLogo} alt="" />
      </div>
      <div className="right">
        <form className="form" onSubmit={handleSubmit}>
          <div className="item">
            <label htmlFor="email">E-Mail :</label>
            <input
              required
              placeholder="jean.dupont@gmania.fr"
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="item">
            <label htmlFor="password">Mot de Passe :</label>
            <input required type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
          </div>

          <Button variant="contained" color="primary" type="submit">
            Se Connecter
          </Button>
        </form>

        <p className="question">Vous n'avez pas encore de compte ?</p>
        <Link to="/register">
          <Button variant="contained" color="primary">
            Inscrivez Vous !
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
