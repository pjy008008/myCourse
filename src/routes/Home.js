import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import List from "../components/List";
import { useState } from "react";

const Home = () => {
  const [field, setField] = useState("");
  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "field") {
      setField((prev) => value);
    }
    console.log("The field has changed", value);
  };
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
            <select value={field} onChange={onChange} name="field">
              <option value="">학년을 고르세요</option>
              <option value="developer">개발자</option>
              <option value="computer system">컴퓨터 시스템</option>
              <option value="artificial intelligence">AI</option>
              <option value="teaching profession">교직이수</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
