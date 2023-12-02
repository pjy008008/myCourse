import { useNavigate } from "react-router-dom";
import styles from "./GetMember.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { prependListener } from "process";

const GetMember = ({ setIsLoggedIn }) => {
  const [user, setUser] = useState();
  const [prePassword, setPrePassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [sem, setSem] = useState();
  const [prefer, setPrefer] = useState();
  const [isPublic, setIsPublic] = useState();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const onClick = () => {
    localStorage.removeItem("token");
    // navigate("/", { replace: true });
    window.location.href = "/";
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    if (newPassword1 !== newPassword2) {
      alert("변경된 비밀번호 불일치");
      return;
    }

    const requestData = {
      password: prePassword,
      prefer: prefer,
      completionsem: sem,
      onoff: isPublic,
      ...(newPassword1 !== "" && { newPassword: newPassword1 }),
    };

    try {
      const response = await axios.put(
        "http://localhost:8080/member",
        requestData,
        {
          headers: {
            Accept: "application/json;charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      if (response.status === 200) {
        alert("정보수정");
      }
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "prePassword") {
      setPrePassword(value);
    } else if (name === "newPassword1") {
      setNewPassword1(value);
    } else if (name === "newPassword2") {
      setNewPassword2(value);
    } else if (name === "sem") {
      setSem(value);
    } else if (name === "prefer") {
      setPrefer(value);
    } else if (name === "isPublic") {
      setIsPublic(value);
    }
    console.log(prePassword, newPassword1, newPassword2, sem, prefer, isPublic);
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
      setUser((prev) => response.data);
      setPrefer(response.data.data.prefer);
      setSem(response.data.data.completionsem);
      setIsPublic(response.data.data.onoff);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.aboveContainer}>
        <div className={styles.userInf}>
          <h2 className={styles.subTitle}>회원정보</h2>
          <form onSubmit={onSubmit}>
            <div>
              {user ? (
                <div>아이디: {user?.data?.account}</div>
              ) : (
                <div>Loading...</div>
              )}
            </div>
            <div>
              <input
                onChange={onChange}
                value={prePassword}
                required
                name="prePassword"
                placeholder="현재 비밀번호"
              />
            </div>
            <div>
              <input
                onChange={onChange}
                value={newPassword1}
                name="newPassword1"
                placeholder="변경 비밀번호"
              />
            </div>
            <div>
              <input
                onChange={onChange}
                value={newPassword2}
                name="newPassword2"
                placeholder="비밀번호 확인"
              />
            </div>
            <button type="submit">변경</button>
          </form>
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
                  <div>
                    이수학년/학기
                    <select value={sem} onChange={onChange} name="sem">
                      <option
                        value="1"
                        selected={user?.data?.completionsem === 1}
                      >
                        1학년 1학기
                      </option>
                      <option
                        value="2"
                        selected={user?.data?.completionsem === 2}
                      >
                        1학년 2학기
                      </option>
                      <option
                        value="3"
                        selected={user?.data?.completionsem === 3}
                      >
                        2학년 1학기
                      </option>
                      <option
                        value="4"
                        selected={user?.data?.completionsem === 4}
                      >
                        2학년 2학기
                      </option>
                      <option
                        value="5"
                        selected={user?.data?.completionsem === 5}
                      >
                        3학년 1학기
                      </option>
                      <option
                        value="6"
                        selected={user?.data?.completionsem === 6}
                      >
                        3학년 2학기
                      </option>
                      <option
                        value="7"
                        selected={user?.data?.completionsem === 7}
                      >
                        4학년 1학기
                      </option>
                      <option
                        value="8"
                        selected={user?.data?.completionsem === 8}
                      >
                        4학년 2학기
                      </option>
                    </select>
                  </div>
                ) : (
                  <div>Loading...</div>
                )}
              </div>
            </div>
            <div className={styles.rightContainer}>
              {" "}
              <div>
                {user ? (
                  <div>
                    선호분야
                    <select value={prefer} onChange={onChange} name="prefer">
                      <option selected={user?.data?.prefer === "ai"} value="ai">
                        AI
                      </option>
                      <option selected={user?.data?.prefer === "cs"} value="cs">
                        컴퓨터 시스템
                      </option>
                      <option
                        selected={user?.data?.prefer === "coding"}
                        value="coding"
                      >
                        개발
                      </option>
                      <option
                        selected={user?.data?.prefer === "teach"}
                        value="teach"
                      >
                        교직 이수
                      </option>
                    </select>
                  </div>
                ) : (
                  <div>Loading...</div>
                )}
              </div>
              <div>
                {user ? (
                  <div>
                    공개여부
                    {user?.data?.onoff}
                    <select
                      value={isPublic}
                      onChange={onChange}
                      name="isPublic"
                    >
                      <option
                        selected={user?.data?.onoff === true}
                        value="true"
                      >
                        공개
                      </option>
                      <option
                        selected={user?.data?.onoff === false}
                        value="false"
                      >
                        비공개
                      </option>
                    </select>
                  </div>
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
