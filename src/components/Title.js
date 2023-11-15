import styles from "./Title.module.css";
import { useNavigate } from "react-router-dom";
const Title = () => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/");
  };
  return (
    <div>
      <h1 onClick={onClick} className={styles.title}>
        My Course
      </h1>
      <hr />
    </div>
  );
};
export default Title;
