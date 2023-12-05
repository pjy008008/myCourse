import axios from "axios";
import styles from "./GetOthers.module.css";
import ai from "../../image/ai.png";
import cs from "../../image/cs.png";
import coding from "../../image/coding.png";
import teach from "../../image/teach.png";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const GetOthers = () => {
  const [userData, setUserData] = useState([]);
  const [selectedPrefer, setSelectedPrefer] = useState("all");

  const { userId } = useParams();
  console.log(userId);

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
        setUserData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  

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

  const getFilteredData = () => {
    if (selectedPrefer === "all") {
      return userData;
    } else {
      return userData.filter((item) => item.prefer === selectedPrefer);
    }
  };

  return (
    <div className={styles.allContainer}>
      <div className={styles.btnContainer}>
        <button className={styles.btnall} onClick={() => setSelectedPrefer("all")}>전체</button>
        <button className={styles.btnai} onClick={() => setSelectedPrefer("ai")}>AI</button>
        <button className={styles.btncs} onClick={() => setSelectedPrefer("cs")}>CS</button>
        <button className={styles.btncoding} onClick={() => setSelectedPrefer("coding")}>개발</button>
        <button className={styles.btnteach} onClick={() => setSelectedPrefer("teach")}>교직</button>
      </div>
      <div className={styles.mainContainer}>
      {getFilteredData().map((item, index) => (
          <Link to={`/other/${item.account}`}>
            <div className={`${styles.userContainer} ${styles.userSize}`} key={index}>
              <div>{chkPre(item)}</div>
              <div className={styles.textContainer}>
                <div className={styles.boldText}>학번</div>
                <div>{item.stdnum}</div>
                <div className={styles.boldText}>이수 학년·학기</div>
                <div>{item.completionsem}</div>
              </div>
              {/* 여기에 필요한 다른 데이터 렌더링 */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GetOthers;
