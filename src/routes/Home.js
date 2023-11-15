import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import List from "../components/List";

const Home = () => {
  return (
    <div>
      <div className={styles.mainContainer}>
        <List />
        <div className={styles.rightContainer}>
          <div className={styles.tableContainer}>
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>1학기</th>
                  <th>2학기</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>1학년 1학기</td>
                  <td>1학년 2학기</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>2학년 1학기</td>
                  <td>2학년 2학기</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>3학년 1학기</td>
                  <td>3학년 2학기</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>4학년 1학기</td>
                  <td>4학년 2학기</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.choiceContainer}>
            <h3>추천</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
