import "./Userinfos.scss";
import * as api from "../../apiCall";
import { useQuery } from "react-query";
import Updatepic from "../Updatepic/Updatepic";
import Updateinfos from "../Updateinfos/Updateinfos";
import Deluser from "../Deluser/Deluser";
import Cookies from "js-cookie";

const Userinfos = () => {
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
  const id = window.location.pathname.split("/user/")[1];
  const { data, isLoading } = useQuery(["profile-user", { id }], () => api.selectOneUser(id));

  if (isLoading) {
    return <div>...</div>;
  }

  const u = data[0];
  return (
    <div className="Userinfos">
      <div className="cover">
        <img src={u.cover} alt="" />
      </div>

      <div className="infos">
        <div className="profilePic">
          <img src={u.avatar} alt="" />
        </div>

        <div className="profileInfos">
          <div className="left">
            <p className="item">Prénom : {u.firstName}</p>
            <p className="item">Nom : {u.lastName}</p>
            <p className="item">Date de naissance : {u.birthday}</p>
            <p className="item">Métier : {u.job}</p>
          </div>
          <div className="right">
            <p className="item">Ville : {u.city}</p>
            <p className="item">Origine : {u.fromCity}</p>
            <p className="item">Scolarité : {u.scholarship}</p>
            <p className="item">Situation amoureuse : {u.relationship}</p>
          </div>
        </div>
      </div>
      {(parseInt(id) === userOn.userId ||
        userOn.isAdmin) && (
          <div className="update__btn">
            <Updatepic user={u} />
            <Updateinfos user={u} />
            <Deluser user={u} />
          </div>
        )}
    </div>
  );
};

export default Userinfos;
