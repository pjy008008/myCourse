import { useNavigate } from "react-router-dom";
import styles from "./GetMember.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const GetMember = ({ setIsLoggedIn }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const onClick = () => {
    localStorage.removeItem("token");
    // navigate("/", { replace: true });
    window.location.href = "/";
  };
  const delBtn = () => {
    const token = localStorage.getItem("token");
    axios
      .delete("http://localhost:8080/member", {
        headers: {
          Accept: "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response);
        onClick();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/member", {
        headers: {
          Accept: "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log(user);
  return (
    <div className={styles.profileContainer}>
      {/* <h2>Profile</h2>
<button onClick={onClick}>Logout</button> */}
      <div className={styles.aboveContainer}>
        <div className={styles.userInf}>
          <h2 className={styles.subTitle}>회원정보</h2>
          <div>
            {user ? (
              <div>아이디: {user?.data?.account}</div>
            ) : (
              <div>Loading...</div>
            )}
          </div>
          <div>
            <input placeholder="현재 비밀번호" />
          </div>
          <div>
            <input placeholder="변경 비밀번호" />
          </div>
          <div>
            <input placeholder="비밀번호 확인" />
          </div>
        </div>
        <div className={styles.schoolInf}>
          <h2 className={styles.subTitle}>충북대학교</h2>
        </div>
      </div>
      <div className={styles.underContainer}>
        <div className={styles.academicInf}>
          <h2 className={styles.subTitle}>학사정보</h2>
          <div className={styles.academicContext}>
            <div className={styles.leftContainer}>
              <div>학과 : 소프트웨어</div>
              <div>
                {user ? (
                  <div>학번: {user?.data?.stdnum}</div>
                ) : (
                  <div>Loading...</div>
                )}
              </div>
              <div>
                {user ? (
                  <div>이수학년/학기: {user?.data?.completionsem}</div>
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            </div>
            <div className={styles.rightContainer}>
              {" "}
              <div>
                {user ? (
                  <div>선호분야: {user?.data?.prefer}</div>
                ) : (
                  <div>Loading...</div>
                )}
              </div>
              <div>
                {user ? (
                  <div>공개여부: {user?.data?.onoff ? "true" : "false"}</div>
                ) : (
                  <div>Loading...</div>
                )}
              </div>
              <button onClick={delBtn}>탈퇴하기</button>
            </div>
          </div>
        </div>
      </div>
      <button onClick={onClick} className={styles.logoutBtn}>
        로그아웃
      </button>
    </div>
  );
};
export default GetMember;
