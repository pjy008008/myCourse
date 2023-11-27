import List from "../components/List";
import styles from "./Other.module.css";
import GetOthers from "../components/others/GetOthers";
const Other = () => {
  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <List />
          </div>
        </div>
        <GetOthers />
      </div>
    </div>
  );
};
export default Other;
