import { useState } from "react";
import styles from "./Register.module.css";
import axios from "axios";

const Register = ({ setToggle, setIsLoggedIn }) => {
  const [id, setId] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [department, setDepartment] = useState("");
  const [studentId, setStudentId] = useState("");
  const [grade, setGrade] = useState("");
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
          major: department,
          stdnum: studentId,
          grade: grade,
          subject: "[]",
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
    } else if (name === "department") {
      setDepartment((prev) => value);
    } else if (name === "studentId") {
      setStudentId((prev) => value);
    } else if (name === "grade") {
      setGrade((prev) => value);
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
            <input
              required
              onChange={onChange}
              placeholder="학과"
              name="department"
              value={department}
              type="text"
            />
            <br />
            <select value={studentId} onChange={onChange} name="studentId">
              <option value="">학번을 고르세요</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
            </select>
            <br />
            <select value={grade} onChange={onChange} name="grade">
              <option value="">학년을 고르세요</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
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
