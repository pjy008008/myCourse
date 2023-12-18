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
  const [subjectDB, setSubjectDB] = useState([]);
  const [neccesarrySum, setNeccesarrySum] = useState(0);
  const [optionalSum, setOptionalSum] = useState(0);
  const [sum, setSum] = useState(0);

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
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/subject", {
        headers: {
          Accept: "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      setUser((prev) => response);
      setSubjectDB(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "sem") {
      setSem(value);
    }
    console.log(sem);
  };

  const getSubjectName = (subnum) => {
    // subjectDB 배열을 반복하면서 subnum과 일치하는 객체를 찾음
    const matchingSubject = subjectDB.find(
      (subject) => subject.subnum === subnum
    );
    // 찾은 객체가 있다면 해당 객체의 subname을 반환, 없다면 빈 문자열 반환
    return matchingSubject ? matchingSubject.subname : "";
  };

  const getSubjectScore = (subnum) => {
    // subjectDB 배열을 반복하면서 subnum과 일치하는 객체를 찾음
    const matchingSubject = subjectDB.find(
      (subject) => subject.subnum === subnum
    );
    // 찾은 객체가 있다면 해당 객체의 subname을 반환, 없다면 빈 문자열 반환
    return matchingSubject ? matchingSubject.score : "";
  };

  const getSubjectCategory = (subnum) => {
    // subjectDB 배열을 반복하면서 subnum과 일치하는 객체를 찾음
    const matchingSubject = subjectDB.find(
      (subject) => subject.subnum === subnum
    );
    // 찾은 객체가 있다면 해당 객체의 subname을 반환, 없다면 빈 문자열 반환
    return matchingSubject ? matchingSubject.category : "";
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    // subject 배열이 변경될 때마다 전필, 전선 합을 계산하여 상태를 업데이트
    const newNeccesarrySum = subject
      .flat()
      .filter((subnum) => getSubjectCategory(subnum) === "전필")
      .reduce((acc, subnum) => acc + getSubjectScore(subnum), 0);

    const newOptionalSum = subject
      .flat()
      .filter((subnum) => getSubjectCategory(subnum) === "전선")
      .reduce((acc, subnum) => acc + getSubjectScore(subnum), 0);

    setNeccesarrySum(newNeccesarrySum);
    setOptionalSum(newOptionalSum);
    setSum(newNeccesarrySum + newOptionalSum);
  }, [subject, getSubjectScore, getSubjectCategory]);

  return (
    <div>
      <div className={styles.mainContainer}>
        <List />
        <div className={styles.contentContainer}>
          <div className={styles.tableContainer}>
            <div className={styles.sum}>
              전필총합 : {neccesarrySum}, 전선총합 : {optionalSum}, 전공 총합:{" "}
              {sum}
            </div>
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
                  <td
                    onClick={() => setSem("1")}
                    className={sem === "1" ? styles.highlighted : ""}
                  >
                    {subject.length > 0 && subject[0] ? (
                      subject[0].map((subject, i) => (
                        <p key={i}>{`${getSubjectCategory(
                          subject
                        )}-${getSubjectName(subject)} ${getSubjectScore(
                          subject
                        )}`}</p>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </td>
                  <td
                    onClick={() => setSem("2")}
                    className={`${styles.tableRight} ${
                      sem === "2" ? styles.highlighted : ""
                    }`}
                  >
                    {subject.length > 1 && subject[1] ? (
                      subject[1].map((subject, i) => (
                        <p key={i}>{`${getSubjectCategory(
                          subject
                        )}-${getSubjectName(subject)} ${getSubjectScore(
                          subject
                        )}`}</p>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className={styles.tableLeft}>2</td>
                  <td
                    onClick={() => setSem("3")}
                    className={sem === "3" ? styles.highlighted : ""}
                  >
                    {subject.length > 2 && subject[2] ? (
                      subject[2].map((subject, i) => (
                        <p key={i}>{`${getSubjectCategory(
                          subject
                        )}-${getSubjectName(subject)} ${getSubjectScore(
                          subject
                        )}`}</p>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </td>
                  <td
                    onClick={() => setSem("4")}
                    className={`${styles.tableRight} ${
                      sem === "4" ? styles.highlighted : ""
                    }`}
                  >
                    {subject.length > 3 && subject[3] ? (
                      subject[3].map((subject, i) => (
                        <p key={i}>{`${getSubjectCategory(
                          subject
                        )}-${getSubjectName(subject)} ${getSubjectScore(
                          subject
                        )}`}</p>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className={styles.tableLeft}>3</td>
                  <td
                    onClick={() => setSem("5")}
                    className={sem === "5" ? styles.highlighted : ""}
                  >
                    {subject.length > 4 && subject[4] ? (
                      subject[4].map((subject, i) => (
                        <p key={i}>{`${getSubjectCategory(
                          subject
                        )}-${getSubjectName(subject)} ${getSubjectScore(
                          subject
                        )}`}</p>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </td>
                  <td
                    onClick={() => setSem("6")}
                    className={`${styles.tableRight} ${
                      sem === "6" ? styles.highlighted : ""
                    }`}
                  >
                    {subject.length > 5 && subject[5] ? (
                      subject[5].map((subject, i) => (
                        <p key={i}>{`${getSubjectCategory(
                          subject
                        )}-${getSubjectName(subject)} ${getSubjectScore(
                          subject
                        )}`}</p>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className={`${styles.tableLeft} ${styles.bottom}`}>4</td>
                  <td
                    onClick={() => setSem("7")}
                    className={`${styles.bottom} ${
                      sem === "7" ? styles.highlighted : ""
                    }`}
                  >
                    {subject.length > 6 && subject[6] ? (
                      subject[6].map((subject, i) => (
                        <p key={i}>{`${getSubjectCategory(
                          subject
                        )}-${getSubjectName(subject)} ${getSubjectScore(
                          subject
                        )}`}</p>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </td>
                  <td
                    onClick={() => setSem("8")}
                    className={`${styles.tableRight} ${styles.bottom} ${
                      sem === "8" ? styles.highlighted : ""
                    }`}
                  >
                    {subject.length > 7 && subject[7] ? (
                      subject[7].map((subject, i) => (
                        <p key={i}>{`${getSubjectCategory(
                          subject
                        )}-${getSubjectName(subject)} ${getSubjectScore(
                          subject
                        )}`}</p>
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
            <Subject
              subject={subject}
              setSubject={setSubject}
              selectSem={sem}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
