import axios from "axios";
import styles from "./GetOthers.module.css";
import ai from "../../image/ai.png";
import cs from "../../image/cs.png";
import coding from "../../image/coding.png";
import teach from "../../image/teach.png";
import { useState, useEffect } from "react";
const GetOthers = () => {
  const [userData, setUserData] = useState([]);
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
        console.log(userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const chkPre = (item) => {
    if (item.prefer === "ai") {
      return <img src={ai} alt="ai" />;
    }else if(item.prefer==="cs"){
        return <img src={cs} alt="cs" />;
    }else if(item.prefer==="teach"){
        return <img src={teach} alt="teach" />;
    }else if(item.prefer==="coding"){
        return <img src={coding} alt="codding" />;
    }
  };
  return (
    <div className={styles.mainContainer}>
      {userData ? (
        userData.map((item, index) => (
          <div className={styles.userContainer} key={index}>
            <div>{chkPre(item)}</div>
            <div>
              {item.stdnum}-{item.completionsem}
            </div>
            {/* 여기에 필요한 다른 데이터 렌더링 */}
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
export default GetOthers;
