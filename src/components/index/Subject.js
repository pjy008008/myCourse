import axios from "axios";
import styles from "./Subject.module.css";
import ai from "../../image/1.png";
import cs from "../../image/3.png";
import coding from "../../image/2.png";
import teach from "../../image/4.png";
import { useState, useEffect } from "react";

const Subject = ({ subject, setSubject, selectSem }) => {
  const [grade, setGrade] = useState("");
  const [sem, setSem] = useState("");
  const [subjectData, setSubjectData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({
    ai: true,
    cs: true,
    coding: true,
    teach: true,
  });
  // const [subject, setSubject] = useState([]);
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

  function isValueIn2DArray(value) {
    // console.log(subject)
    return subject.flat().includes(value);
  }

  const handleCheckboxChange = (subnum) => {
    // 현재 subject 상태를 복사하여 수정
    const updatedSubject = [...subject];

    // subnum이 이미 배열에 있는지 확인
    const isAlreadyChecked = isValueIn2DArray(subnum);

    // 이미 체크된 경우, 배열에서 제거
    if (isAlreadyChecked) {
      const rowIndex = updatedSubject.findIndex((row) => row.includes(subnum));
      const columnIndex = updatedSubject[rowIndex].indexOf(subnum);
      updatedSubject[rowIndex].splice(columnIndex, 1);
    } else if (selectSem === 0) {
      alert("학기를 선택해주세요");
    } else {
      updatedSubject[selectSem - 1].push(subnum);
    }

    // 수정된 상태를 적용
    setSubject(updatedSubject);
    console.log(subject);
  };

  function filterSubjectData() {
    return subjectData.filter((item) => {
      const meetsGradeAndSemConditions =
        (grade === "" || item.grade === parseInt(grade)) &&
        (sem === "" || item.sem === parseInt(sem));

      const meetsCategoryConditions =
        (selectedCategories.ai && item.ai) ||
        (selectedCategories.cs && item.cs) ||
        (selectedCategories.coding && item.coding) ||
        (selectedCategories.teach && item.teach);

      return meetsGradeAndSemConditions && meetsCategoryConditions;
    });
  }
  const toggleCategory = (category) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const toggleAllCategories = () => {
    const allCategoriesAreSelected = Object.values(selectedCategories).every(
      (value) => value === true
    );

    if (allCategoriesAreSelected) {
      setSelectedCategories({
        ai: false,
        cs: false,
        coding: false,
        teach: false,
      });
    } else {
      setSelectedCategories({
        ai: true,
        cs: true,
        coding: true,
        teach: true,
      });
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "grade") {
      setGrade(value);
    } else if (name === "sem") {
      setSem(value);
    }
  };

  const onSubmit = async (event) => {
    //code when submit instruction executed
    window.location.href = "/";
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        "http://localhost:8080/member",
        { subject },
        {
          headers: {
            Accept: "application/json;charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        console.log("정보 수정 완료");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
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
        <div className={styles.categoryButtons}>
          <button className={styles.categoryBtn} onClick={toggleAllCategories}>
            전체
          </button>
          <button
            className={styles.categoryBtn}
            onClick={() => toggleCategory("ai")}
            style={{
              backgroundColor: selectedCategories.ai ? "#cc5448" : "#e26a5e",
              "box-shadow": selectedCategories.ai ? "0 0 10px rgba(0, 0, 0, 0.3)" : "",
            }}
          >
            AI
          </button>
          <button
            className={styles.categoryBtn}
            onClick={() => toggleCategory("cs")}
            style={{
              backgroundColor: selectedCategories.cs ? "#d6a638" : "#ecbd50",
              "box-shadow": selectedCategories.cs ? "0 0 10px rgba(0, 0, 0, 0.3)" : "",
            }}
          >
            CS
          </button>
          <button
            className={styles.categoryBtn}
            onClick={() => toggleCategory("coding")}
            style={{
              backgroundColor: selectedCategories.coding
                ? "#53ac3c"
                : "#6dc356",
              "box-shadow": selectedCategories.coding
                ? "0 0 10px rgba(0, 0, 0, 0.3)"
                : "",
            }}
          >
            개발
          </button>
          <button
            className={styles.categoryBtn}
            onClick={() => toggleCategory("teach")}
            style={{
              backgroundColor: selectedCategories.teach ? "#395690" : "#536fa7",
              "box-shadow": selectedCategories.teach
                ? "0 0 10px rgba(0, 0, 0, 0.3)"
                : "",
            }}
          >
            교직
          </button>
        </div>
      </div>
      <div>
        <ul className={styles.subjectList}>
          {filterSubjectData().map((item, index) => (
            <li key={index}>
              <p>
                <input
                  checked={isValueIn2DArray(item.subnum)}
                  className={styles.checkBox}
                  type="checkbox"
                  onChange={() => handleCheckboxChange(item.subnum)}
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
      <button onClick={onSubmit} className={styles.submitBtn}>
        My Course 저장
      </button>
    </div>
  );
};
export default Subject;
