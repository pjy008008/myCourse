import axios from "axios";
import styles from "./Subject.module.css";
import ai from "../../image/1.png";
import cs from "../../image/3.png";
import coding from "../../image/2.png";
import teach from "../../image/4.png";
import { useState, useEffect } from "react";

const Subject = () => {
  const [grade, setGrade] = useState("");
  const [sem, setSem] = useState("");
  const [subjectData, setSubjectData] = useState([]);
  const [subject, setSubject] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/subject", {
          headers: {
            Accept: "application/json;charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        });
        setSubjectData(response.data.data);
        console.log(subjectData);
      } catch (error) {
        console.log(error);
      }
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/member", {
          headers: {
            Accept: "application/json;charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data.data.subject);
        setSubject(response.data.data.subject);
        const bool = subject[0].includes(5118002);
        console.log(isValueIn2DArray(5118001));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [grade, sem]);

  function isValueIn2DArray(value) {
    for (let i = 0; i < subject.length; i++) {
      for (let j = 0; j < subject[i].length; j++) {
        if (subject[i][j] === value) {
          return true;
        }
      }
    }
    return false;
  }

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "grade") {
      setGrade(value);
    } else if (name === "sem") {
      setSem(value);
    }
    console.log(subjectData);
  };

  return (
    <div>
      <div className={styles.selectContainer}>
        <select
          id={styles.leftSelection}
          className={styles.selection}
          value={grade}
          onChange={onChange}
          name="grade"
        >
          <option value="">학년을 고르세요</option>
          <option value="1">1학년</option>
          <option value="2">2학년</option>
          <option value="3">3학년</option>
          <option value="4">4학년</option>
        </select>
        <select
          id={styles.rightSelection}
          className={styles.selection}
          value={sem}
          onChange={onChange}
          name="sem"
        >
          <option value="">학기를 고르세요</option>
          <option value="1">1학기</option>
          <option value="2">2학기</option>
        </select>
      </div>
      <div>
        <ul className={styles.subjectList}>
          {grade === "" && sem === ""
            ? subjectData.map((item, index) => (
                <li key={index}>
                  <p>
                    <input
                      checked={isValueIn2DArray(item.subnum)}
                      className={styles.checkBox}
                      type="checkbox"
                    />
                    {item.category}-{item.subname}-{item.score}
                    {item.ai && <img src={ai} alt="ai" />}
                    {item.cs && <img src={cs} alt="cs" />}
                    {item.coding && <img src={coding} alt="coding" />}
                    {item.teach && <img src={teach} alt="teach" />}
                  </p>
                  {/* 여기에 필요한 다른 데이터 렌더링 */}
                </li>
              ))
            : subjectData
                .filter(
                  (item) =>
                    item.grade === parseInt(grade) && item.sem === parseInt(sem)
                )
                .map((item, index) => (
                  <li key={index}>
                    <p>
                      <input
                        checked={isValueIn2DArray(item.subnum)}
                        className={styles.checkBox}
                        type="checkbox"
                      />
                      {item.category}-{item.subname}-{item.score}{" "}
                      {item.ai && <img src={ai} alt="ai" />}
                      {item.cs && <img src={cs} alt="cs" />}
                      {item.coding && <img src={coding} alt="coding" />}
                      {item.teach && <img src={teach} alt="teach" />}
                    </p>
                    {/* 여기에 필요한 다른 데이터 렌더링 */}
                  </li>
                ))}
        </ul>
      </div>
    </div>
  );
};
export default Subject;
