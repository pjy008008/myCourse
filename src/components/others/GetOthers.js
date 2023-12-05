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
  return (
    <div className={styles.mainContainer}>
      {userData ? (
        userData.map((item, index) => (
          <Link to={`/other/${item.account}`}>
            <div className={styles.userContainer} key={index}>
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
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default GetOthers;
