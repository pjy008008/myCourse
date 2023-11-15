import { Link, useNavigate } from "react-router-dom";
import List from "../components/List";
import styles from "./Profile.module.css";
const Profile = () => {
  const navigate = useNavigate();
  const onClick = () => {
    localStorage.removeItem("isLoggedIn");
    // navigate("/", { replace: true });
    window.location.href = "/";
  };
  return (
    <div>
      <div className={styles.mainContainer}>
        <List />
        <div>
          <h2>Profile</h2>
          <button onClick={onClick}>Logout</button>
        </div>
      </div>
    </div>
  );
};
export default Profile;
