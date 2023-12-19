import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import List from "../components/List";
import Subject from "../components/index/Subject";
import { useState, useEffect } from "react";
import axios from "axios";
import { setgid } from "process";

const Home = () => {
  const [ge, setGe] = useState(0);
  const [sem, setSem] = useState(0);
  const [subject, setSubject] = useState([]);
  const [subjectDB, setSubjectDB] = useState([]);
  const [neccesarrySum, setNeccesarrySum] = useState(0);
  const [optionalSum, setOptionalSum] = useState(0);
  const [majorSum, setMajorSum] = useState(0);
  const [sum, setSum] = useState(0);
  const [leftSum, setLeftSum] = useState(140);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/member", {
        headers: {
          Accept: "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      setGe(response.data.data.ge);
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
    } else if (name === "ge") {
      if (value >= 40) {
        setGe(40);
      } else {
        setGe(value);
      }
    }
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
    if (matchingSubject) {
      if (matchingSubject.category === "0") {
        return "전선";
      } else if (matchingSubject.category === "1") {
        return "전필";
      } else if (matchingSubject.category === "2") {
        return "일선";
      }
    } else {
      return "";
    }
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
    setMajorSum(newNeccesarrySum + newOptionalSum);

    // Ensure ge is a numeric value or set it to 0 if it's null or empty string
    const numericGe = ge !== null && ge !== "" ? parseInt(ge) : 0;
    // Add numericGe and majorSum
    setSum(numericGe + parseInt(majorSum));
    if (sum >= 140) {
      setSum(140);
    }
    setLeftSum(140 - sum);
  }, [subject, getSubjectScore, getSubjectCategory, ge, majorSum]);

  return (
    <div>
      <div className={styles.mainContainer}>
        <List />
        <div className={styles.contentContainer}>
          <div className={styles.tableContainer}>
            <div className={styles.sum}>
              <div className={styles.sum1}>
                <div>
                  <label className={styles.out}>전공 필수 </label>
                  <input
                    type="number"
                    value={neccesarrySum}
                    disabled
                    className={styles.in}
                  />
                </div>
                <div>
                  <label className={styles.out}>전공 선택 </label>
                  <input
                    type="number"
                    value={optionalSum}
                    disabled
                    className={styles.in}
                  />
                </div>
                <div>
                  <label className={styles.out}>전공 총합 </label>
                  <input
                    type="number"
                    value={majorSum}
                    disabled
                    className={styles.in}
                  />
                </div>
              </div>
              <div className={styles.sum2}>
                <div>
                  <label className={styles.out}>교양 학점 </label>
                  <input
                    name="ge"
                    type="number"
                    onChange={onChange}
                    value={ge}
                    id={styles.ge}
                    placeholder="입력"
                    className={styles.in}
                  />
                </div>
                <div>
                  <label className={styles.out}>학점 총합 </label>
                  <input
                    type="number"
                    value={sum}
                    disabled
                    className={styles.in}
                  />
                </div>
                <div>
                  <label className={styles.out}>필요 학점 </label>
                  <input
                    type="number"
                    value={leftSum}
                    disabled
                    className={styles.in}
                  />
                </div>
              </div>
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
                        <p key={i}>{`[${getSubjectCategory(
                          subject
                        )}] ${getSubjectName(subject)} (${getSubjectScore(
                          subject
                        )}학점)`}</p>
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
                        <p key={i}>{`[${getSubjectCategory(
                          subject
                        )}] ${getSubjectName(subject)} (${getSubjectScore(
                          subject
                        )}학점)`}</p>
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
                        <p key={i}>{`[${getSubjectCategory(
                          subject
                        )}] ${getSubjectName(subject)} (${getSubjectScore(
                          subject
                        )}학점)`}</p>
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
                        <p key={i}>{`[${getSubjectCategory(
                          subject
                        )}] ${getSubjectName(subject)} (${getSubjectScore(
                          subject
                        )}학점)`}</p>
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
                        <p key={i}>{`[${getSubjectCategory(
                          subject
                        )}] ${getSubjectName(subject)} (${getSubjectScore(
                          subject
                        )}학점)`}</p>
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
                        <p key={i}>{`[${getSubjectCategory(
                          subject
                        )}] ${getSubjectName(subject)} (${getSubjectScore(
                          subject
                        )}학점)`}</p>
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
                        <p key={i}>{`[${getSubjectCategory(
                          subject
                        )}] ${getSubjectName(subject)} (${getSubjectScore(
                          subject
                        )}학점)`}</p>
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
                        <p key={i}>{`[${getSubjectCategory(
                          subject
                        )}] ${getSubjectName(subject)} (${getSubjectScore(
                          subject
                        )}학점)`}</p>
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
              ge={ge}
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
