import axios from "axios";
import styles from "./Subject.module.css";
import { useState, useEffect } from "react";

const Subject = () => {
  const [grade, setGrade] = useState("");
  const [sem, setSem] = useState("");
  const [subjectData, setSubjectData] = useState([]);

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
    };

    fetchData();
  }, [grade, sem]);

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
        <ul>
          {grade === "" && sem === ""
            ? subjectData.map((item, index) => (
                <li key={index}>
                  <p>
                    {item.category}-{item.subname}-{item.score}
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
                      {item.category}-{item.subname}-{item.score}
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
