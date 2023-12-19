import { useParams, Link, useNavigate } from "react-router-dom";
import styles from "./OtherProfile.module.css";
import List from "../components/List";
import ai from "../image/ai.png";
import cs from "../image/cs.png";
import coding from "../image/coding.png";
import teach from "../image/teach.png";
import { useEffect, useState } from "react";
import axios from "axios";

const chkPre = (item) => {
  return (
    <div className={styles.imageContainer}>
      {item.prefer === "ai" && <img src={ai} alt="ai" />}
      {item.prefer === "cs" && <img src={cs} alt="cs" />}
      {item.prefer === "teach" && <img src={teach} alt="teach" />}
      {item.prefer === "coding" && <img src={coding} alt="coding" />}
    </div>
  );
};

const OtherProfile = () => {
  const params = useParams();
  const [userData, setUserData] = useState(null);
  const [subjectDB, setSubjectDB] = useState([]);
  const [neccesarrySum, setNeccesarrySum] = useState(0);
  const [optionalSum, setOptionalSum] = useState(0);
  const [sum, setSum] = useState(0);

  const navigate = useNavigate();
  const otherClick = () => {
    navigate("/other");
  };

  const handleSem = (sem) => {
    if (sem === 1) {
      return "1학년 1학기";
    } else if (sem === 2) {
      return "1학년 2학기";
    } else if (sem === 3) {
      return "2학년 1학기";
    } else if (sem === 4) {
      return "2학년 2학기";
    } else if (sem === 5) {
      return "3학년 1학기";
    } else if (sem === 6) {
      return "3학년 2학기";
    } else if (sem === 7) {
      return "4학년 1학기";
    } else if (sem === 8) {
      return "4학년 2학기";
    }
  };

  const handleChangeSubject = async (event) => {
    // window.location.href = "/";
    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        "http://localhost:8080/member",
        { subject: userData.subject },
        {
          headers: {
            Accept: "application/json;charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        alert("변경완료");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
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
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/member/everyone",
          {
            headers: {
              Accept: "application/json;charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userWithMatchingAccount = response.data.data.find(
          (user) => user.account === params.id
        );
        setUserData(userWithMatchingAccount);
        const newNeccesarrySum = userData.subject
          .flat()
          .filter((subnum) => getSubjectCategory(subnum) === "전필")
          .reduce((acc, subnum) => acc + getSubjectScore(subnum), 0);

        const newOptionalSum = userData.subject
          .flat()
          .filter((subnum) => getSubjectCategory(subnum) === "전선")
          .reduce((acc, subnum) => acc + getSubjectScore(subnum), 0);

        setNeccesarrySum(newNeccesarrySum);
        setOptionalSum(newOptionalSum);
        setSum(newNeccesarrySum + newOptionalSum);
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

    fetchData();
  }, [params.id]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>
          <List />
        </div>
      </div>
      {userData ? (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={`${styles.tableLeft} ${styles.top}`}></th>
                <th className={styles.top}>1학기</th>
                <th className={`${styles.tableRight} ${styles.top}`}>2학기</th>
              </tr>
            </thead>
            <tbody>
              {[0, 2, 4, 6].map((row) => (
                <tr key={row}>
                  <td className={styles.tableLeft}>{row / 2 + 1}</td>
                  {[0, 1].map((col) => (
                    <td key={col}>
                      {userData.subject[row + col].map((subject, i) => (
                        <p key={i}>{`[${getSubjectCategory(
                          subject
                        )}] ${getSubjectName(subject)} (${getSubjectScore(
                          subject
                        )}학점)`}</p>
                      ))}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {userData ? (
        <div className={styles.userContainer}>
          <div>{chkPre(userData)}</div>
          <div className={styles.textContainer}>
            <div className={styles.boldText}>학번</div>
            <div>{userData.stdnum}</div>
            <div className={styles.boldText}>선호 분야</div>
                <div>
                  {userData.prefer === "ai" && "AI"}
                  {userData.prefer === "cs" && "컴퓨터시스템"}
                  {userData.prefer === "coding" && "개발"}
                  {userData.prefer === "teach" && "교직"}
                </div>
            <div className={styles.boldText}>이수 학년·학기</div>
            <div>{handleSem(userData.completionsem)}</div>
            {/* <div>
              전필총합 : {neccesarrySum}, 전선총합 : {optionalSum}, 전공 총합:{" "}
              {sum}
            </div> */}
          </div>
        </div>
      ) : (
        <div>No user data available</div>
      )}
      <button onClick={handleChangeSubject} className={styles.storeBtn}>
        커리큘럼 가져오기{" "}
      </button>
      <button onClick={otherClick} className={styles.goBackBtn}>
        뒤로 가기
      </button>
    </div>
  );
};

export default OtherProfile;
