import { Link, useNavigate } from "react-router-dom";
import List from "../components/List";
import styles from "./Profile.module.css";
import GetMember from "../components/profile/GetMember";
const Profile = ({ setIsLoggedIn }) => {
  return (
    <div>
      <div className={styles.mainContainer}>
        <List />
        <GetMember setIsLoggedIn={setIsLoggedIn} />
      </div>
    </div>
  );
};
export default Profile;
