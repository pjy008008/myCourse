import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import List from "../components/List";
import Subject from "../components/index/Subject";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState({});
  const [sem, setSem] = useState(0);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/member", {
        headers: {
          Accept: "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      setUser((prev) => response.data.data);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "sem") {
      setSem(value);
    }
  };
  const submitBtn = () => {};
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className={styles.mainContainer}>
        <List />
        <div className={styles.contentContainer}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={`${styles.tableLeft} ${styles.top}`}></th>
                  <th className={styles.top}>1학기</th>
                  <th className={`${styles.tableRight} ${styles.top}`}>
                    2학기
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.tableLeft}>1</td>
                  <td>1학년 1학기</td>
                  <td className={styles.tableRight}>1학년 2학기</td>
                </tr>
                <tr>
                  <td className={styles.tableLeft}>2</td>
                  <td>2학년 1학기</td>
                  <td className={styles.tableRight}>2학년 2학기</td>
                </tr>
                <tr>
                  <td className={styles.tableLeft}>3</td>
                  <td>3학년 1학기</td>
                  <td className={styles.tableRight}>3학년 2학기</td>
                </tr>
                <tr>
                  <td className={`${styles.tableLeft} ${styles.bottom}`}>4</td>
                  <td className={styles.bottom}>4학년 1학기</td>
                  <td className={`${styles.tableRight} ${styles.bottom}`}>
                    4학년 2학기
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.choiceContainer}>
            <button onClick={submitBtn} className={styles.submitBtn}>
              My Course저장
            </button>
            <div className={styles.semSelect}>
              <select id={styles.select} value={sem} onChange={onChange} name="sem">
                <option value="">학년 학기</option>
                <option value="1">1학년 1학기</option>
                <option value="2">1학년 2학기</option>
                <option value="1">2학년 1학기</option>
                <option value="2">2학년 2학기</option>
                <option value="1">3학년 1학기</option>
                <option value="2">3학년 2학기</option>
                <option value="1">4학년 1학기</option>
                <option value="2">4학년 2학기</option>
              </select>
            </div>
            <Subject />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
