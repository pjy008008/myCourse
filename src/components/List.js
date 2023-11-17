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
      <h1 className={styles.title}>My Course</h1>
      <div className={styles.listBorder}>
        <h2 onClick={mainClick} className={styles.list}>
          시간표
        </h2>
      </div>
      <div className={styles.listBorder}>
        <h2 onClick={profileClick} className={styles.list}>
          프로필
        </h2>
      </div>
      <div className={styles.listBorder}>
        <h2 onClick={otherClick} className={styles.list}>
          둘러보기
        </h2>
      </div>
    </div>
  );
};
export default List;
