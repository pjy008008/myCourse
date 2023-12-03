import { useParams } from "react-router-dom";
import styles from "./OtherProfile.module.css";
import List from "../components/List";
import { useEffect, useState } from "react";
import axios from "axios";

const OtherProfile = () => {
  const params = useParams();
  const [userData, setUserData] = useState(null);

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
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [params.id]);

  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.titleContainer}>
            <List />
          {/* <div className={styles.title}>
          </div> */}
        </div>
        {userData ? (
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
                {[0, 2, 4, 6].map((row) => (
                  <tr key={row}>
                    <td className={styles.tableLeft}>{row / 2 + 1}</td>
                    {[0, 1].map((col) => (
                      <td key={col}>
                        {userData.subject[row + col].map((subjectCode, i) => (
                          <p key={i}>{`과목: ${subjectCode}`}</p>
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
      </div>
    </div>
  );
};

export default OtherProfile;
