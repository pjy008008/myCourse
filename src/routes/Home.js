import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import List from "../components/List";
import Subject from "../components/index/Subject";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState({});
  const [sem, setSem] = useState(0);
  const [subject, setSubject] = useState([]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/member", {
        headers: {
          Accept: "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      setUser((prev) => response);
      setSubject(response.data.data.subject);
      console.log(response.data.data.subject);
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
                  <td>
                    {subject.length > 0 && subject[0] ? (
                      subject[0].map((subject, i) => (
                        <p key={i}>{`과목코드 : ${subject}`}</p>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </td>
                  <td className={styles.tableRight}>
                    {subject.length > 1 && subject[1] ? (
                      subject[1].map((subject, i) => (
                        <p key={i}>{`과목코드 : ${subject}`}</p>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className={styles.tableLeft}>2</td>
                  <td>
                    {subject.length > 2 && subject[2] ? (
                      subject[2].map((subject, i) => (
                        <p key={i}>{`과목코드 : ${subject}`}</p>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </td>
                  <td className={styles.tableRight}>
                    {subject.length > 3 && subject[3] ? (
                      subject[3].map((subject, i) => (
                        <p key={i}>{`과목코드 : ${subject}`}</p>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className={styles.tableLeft}>3</td>
                  <td>
                    {subject.length > 4 && subject[4] ? (
                      subject[4].map((subject, i) => (
                        <p key={i}>{`과목코드 : ${subject}`}</p>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </td>
                  <td className={styles.tableRight}>
                    {subject.length > 5 && subject[5] ? (
                      subject[5].map((subject, i) => (
                        <p key={i}>{`과목코드 : ${subject}`}</p>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className={`${styles.tableLeft} ${styles.bottom}`}>4</td>
                  <td className={styles.bottom}>
                    {subject.length > 6 && subject[6] ? (
                      subject[6].map((subject, i) => (
                        <p key={i}>{`과목코드 : ${subject}`}</p>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </td>
                  <td className={`${styles.tableRight} ${styles.bottom}`}>
                    {subject.length > 7 && subject[7] ? (
                      subject[7].map((subject, i) => (
                        <p key={i}>{`과목코드 : ${subject}`}</p>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.choiceContainer}>
            <button onClick={submitBtn} className={styles.submitBtn}>
              My Course 저장
            </button>
            <div className={styles.semSelect}>
              <select
                id={styles.select}
                value={sem}
                onChange={onChange}
                name="sem"
              >
                <option value="">시간표를 입력할 칸을 선택해주세요</option>
                <option value="1">1학년 1학기</option>
                <option value="2">1학년 2학기</option>
                <option value="3">2학년 1학기</option>
                <option value="4">2학년 2학기</option>
                <option value="5">3학년 1학기</option>
                <option value="6">3학년 2학기</option>
                <option value="7">4학년 1학기</option>
                <option value="8">4학년 2학기</option>
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
