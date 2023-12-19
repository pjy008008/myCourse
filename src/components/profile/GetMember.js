import { useNavigate } from "react-router-dom";
import styles from "./GetMember.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { prependListener } from "process";
import cbnu from "../../image/cbnu.png";
import link from "../../image/link.png";

const GetMember = ({ setIsLoggedIn }) => {
  const [user, setUser] = useState();
  const [prePassword, setPrePassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [sem, setSem] = useState();
  const [prefer, setPrefer] = useState();
  const [isPublic, setIsPublic] = useState();
  const [data, setData] = useState({});
  const [stdnum, setStdnum] = useState();
  const [subject, setSubject] = useState();
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
      stdnum: stdnum,
      subject: subject,
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
        setPrePassword((prev) => "");
        setNewPassword1((prev) => "");
        setNewPassword2((prev) => "");
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
      setSubject(response.data.data.subject);
      setStdnum(response.data.data.stdnum);
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
              <div className={styles.textleftContainer00}>
                  <div>아이디
                  <input
                  className={styles.marginLeft2}
                  value={user?.data?.account}
                  disabled
                />
                </div>
                </div>
            </div>
            <div className={styles.textleftContainer}>
              <div>
                현재 비밀번호
                <input
                  className={styles.marginLeft}
                  onChange={onChange}
                  value={prePassword}
                  required
                  type="password"
                  name="prePassword"
                  placeholder="현재 비밀번호"
                />
              </div>
            </div>
            <div className={styles.textleftContainer}>
              변경 비밀번호
              <input
                className={styles.marginLeft}
                onChange={onChange}
                value={newPassword1}
                name="newPassword1"
                type="password"
                placeholder="변경 비밀번호"
              />
            </div>
            <div className={styles.textleftContainer01}>
              비밀번호 확인
              <input
                className={styles.marginLeft}
                onChange={onChange}
                value={newPassword2}
                name="newPassword2"
                type="password"
                placeholder="비밀번호 확인"
              />
            </div>
            <button className={styles.changeBtn} type="submit">
              변경
            </button>
          </form>
        </div>

        <div className={styles.schoolInf}>
          <img
            src={cbnu}
            alt="CBNU Logo"
            className={`${styles.imageContainer} ${styles.cbnuLogo}`}
          />
          <div className={styles.textContainer3}>
            <div className={styles.boldText}>개신누리</div>
            <img
              src={link}
              alt="link"
              className={`${styles.imageContainer} ${styles.imglink}`}
            />
            <a
              className={styles.link}
              href="https://eis.cbnu.ac.kr/cbnuLogin?1645100877"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>https://bit.ly/47NPhz7</div>
            </a>
          </div>
          <div className={styles.textContainer3}>
            <div className={styles.boldText}>졸업과정 확인</div>
            <img
              src={link}
              alt="link"
              className={`${styles.imageContainer} ${styles.imglink}`}
            />
            <a
              className={styles.link}
              href="https://www.chungbuk.ac.kr/site/f09/boardList.do?boardSeq=636&key=1446&part=B00000"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>https://bit.ly/49Whnda</div>
            </a>
          </div>
          <div className={styles.textContainer3}>
            <div className={styles.boldText}>학과 홈페이지</div>
            <img
              src={link}
              alt="link"
              className={`${styles.imageContainer} ${styles.imglink}`}
            />
            <a
              className={styles.link}
              href="https://software.cbnu.ac.kr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>https://software.cbnu.ac.kr/</div>
            </a>
          </div>
          <div className={styles.textContainer3}>
            <div className={styles.boldText}>sw중심사업단</div>
            <img
              src={link}
              alt="link"
              className={`${styles.imageContainer} ${styles.imglink}`}
            />
            <a
              className={styles.link}
              href="https://sw7up.cbnu.ac.kr/home"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>https://sw7up.cbnu.ac.kr/home</div>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.underContainer}>
        <div className={styles.academicInf}>
          <h2 className={styles.subTitle}>학사정보</h2>
          <div className={styles.academicContext}>
            <div className={styles.leftContainer}>
              <div className={styles.textContainer1}>
              <div className={styles.textleftContainer00}>
                  <div>학과
                  <input
                  className={styles.marginLeft3}
                  value="소프트웨어"
                  disabled
                />
                </div>
                </div>
              </div>
              <div>
                {user ? (
                  <div className={styles.textleftContainer}>
                  <div>학번
                  <input
                  className={styles.marginLeft3}
                  value={user?.data?.stdnum}
                  disabled
                />
                </div>
                </div>
                ) : (
                  <div>Loading...</div>
                )}
              </div>
              <div>
                {user ? (
                  <div className={styles.textleftContainer01}>
                    이수 학년·학기
                    <select
                      className={styles.marginLeft1}
                      value={sem}
                      onChange={onChange}
                      name="sem"
                    >
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
                  <div className={styles.textleftContainer02}>
                    선호 분야
                    <select
                      className={styles.marginLeft}
                      value={prefer}
                      onChange={onChange}
                      name="prefer"
                    >
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
                        교직
                      </option>
                    </select>
                  </div>
                ) : (
                  <div>Loading...</div>
                )}
              </div>
              <div>
                {user ? (
                  <div className={styles.textleftContainer}>
                    공개 여부
                    {user?.data?.onoff}
                    <select
                      className={styles.marginLeft}
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
              <button onClick={delBtn} className={styles.delBtn}>
                탈퇴하기
              </button>
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
