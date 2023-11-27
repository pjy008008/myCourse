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
      <h1 onClick={mainClick} className={styles.title}>My Course</h1>
      <div className={styles.listBorder}>
        <h2 onClick={profileClick} className={styles.list}>
          Profile
        </h2>
      </div>
      <div className={styles.listBorder}>
        <h2 onClick={otherClick} className={styles.list}>
          Community
        </h2>
      </div>
    </div>
  );
};
export default List;
