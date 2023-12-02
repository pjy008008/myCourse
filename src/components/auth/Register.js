import { useState } from "react";
import styles from "./Register.module.css";
import axios from "axios";

const Register = ({ setToggle, setIsLoggedIn }) => {
  const [id, setId] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [prefer, setPrefer] = useState("");
  const [studentId, setStudentId] = useState("");
  const [completionsem, setCompletionsem] = useState("");
  const [subject, setSubject] = useState([[], [], [], [], [], [], [], []]);
  const [error, setError] = useState("");

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
    setIsLoggedIn(true);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (password1 !== password2) {
      alert("비밀번호 불일치");
      return;
    }
    axios
      .post(
        "http://localhost:8080/sign-up",
        {
          account: id,
          password: password1,
          prefer: prefer,
          stdnum: studentId,
          completionsem: completionsem,
          subject: subject,
          onoff: true,
        },
        {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json;charset=UTF-8",
        }
      )
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          alert("회원가입 완료");
        }

        // localStorage.setItem("isLoggedIn", true);
        // window.location.reload();
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
        alert(error.response.data.message);
        setError((prev) => error.response.data.message);
      });

    //Register Data Validation
    // handleLogin();
    // console.log(id, password1, password2, department, studentId, grade);
  };
  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "id") {
      setId((prev) => value);
    } else if (name === "password1") {
      setPassword1((prev) => value);
    } else if (name === "password2") {
      setPassword2((prev) => value);
    } else if (name === "prefer") {
      setPrefer((prev) => value);
    } else if (name === "studentId") {
      setStudentId((prev) => value);
    } else if (name === "completionsem") {
      setCompletionsem((prev) => value);
    }
  };
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.rightContainer}>
          <h2 className={styles.subTitle}>
            사용자 등록을 위한 정보를 입력해주세요
          </h2>
          <form onSubmit={onSubmit}>
            <input
              required
              onChange={onChange}
              placeholder="아이디"
              name="id"
              value={id}
              type="text"
            />
            <br />
            <input
              required
              onChange={onChange}
              placeholder="비밀번호"
              name="password1"
              value={password1}
              type="password"
            />
            <br />
            <input
              required
              onChange={onChange}
              placeholder="비밀번호 재입력"
              name="password2"
              value={password2}
              type="password"
            />

            <br />
            <select required value={prefer} onChange={onChange} name="prefer">
              <option value="" disabled hidden>선호 분야</option>
              <option value="ai">AI</option>
              <option value="cs">컴퓨터 시스템</option>
              <option value="coding">개발</option>
              <option value="teach">교직 이수</option>
            </select>
            <br />
            <select required value={studentId} onChange={onChange} name="studentId">
              <option value="" disabled hidden>학번</option>
              <option value="23">23학번</option>
              <option value="23">22학번</option>
              <option value="23">21학번</option>
              <option value="23">20학번</option>
              <option value="23">19학번</option>
              <option value="23">18학번</option>
            </select>
            <br />
            <select
              required
              value={completionsem}
              onChange={onChange}
              name="completionsem"
            >
              <option value="" disabled hidden>이수 학년/학기</option>
              <option value="1">1학년 1학기</option>
              <option value="2">1학년 2학기</option>
              <option value="3">2학년 1학기</option>
              <option value="4">2학년 2학기</option>
              <option value="5">3학년 1학기</option>
              <option value="6">3학년 2학기</option>
              <option value="7">4학년 1학기</option>
              <option value="8">4학년 2학기</option>
            </select>
            <br />
            {password1 !== password2 ? (
              <span className={styles.error}>비밀번호가 일치하지 않습니다</span>
            ) : (
              <span className={styles.error}></span>
            )}
            <br />
            <input
              className={styles.submitBtn}
              type="submit"
              value="회원가입"
            />
          </form>
          <button
            className={styles.submitBtn}
            onClick={() => {
              setToggle((prev) => !prev);
            }}
          >
            <span>로그인으로 이동</span>
          </button>
        </div>
        <div className={styles.leftContainer}>
          <h1 className={styles.title}>Sign up</h1>
        </div>
      </div>
    </div>
  );
};
export default Register;