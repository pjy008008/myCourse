import List from "../components/List";
import styles from "./Other.module.css";
import EditProfile from "../components/EditProfile";
import GetSubject from "../components/index/GetSubject";
const Other = () => {
  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <List />
          </div>
        </div>
        <h1>Other</h1>
        <GetSubject />
      </div>
    </div>
  );
};
export default Other;
