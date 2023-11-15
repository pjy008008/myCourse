import { Link, useNavigate } from "react-router-dom";
import styles from "./List.module.css";

const List = () => {
  const navigate = useNavigate();
  const profileClick = () => {
    navigate("/profile");
  };
  const otherClick = () => {
    navigate("/other");
  };
  const mainClick = () => {
    navigate("/");
  };
  return (
    <div className={styles.listContainer}>
      <div className={styles.listBorder}>
        <h2 onClick={mainClick} className={styles.list}>
          main
        </h2>
      </div>
      <div className={styles.listBorder}>
        <h2 onClick={profileClick} className={styles.list}>
          profile
        </h2>
      </div>
      <div className={styles.listBorder}>
        <h2 onClick={otherClick} className={styles.list}>
          Other
        </h2>
      </div>
    </div>
  );
};
export default List;
