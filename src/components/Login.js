import { useState } from "react";
import { useEffect } from "react";
import styles from "./Login.module.css";
const Login = ({ setIsLoggedIn }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
    setIsLoggedIn(true);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    //Login data Validation

    handleLogin();
    console.log(id);
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === "id") {
      setId((prev) => value);
    } else if (name === "password") {
      setPassword((prev) => value);
    }
  };

  return (
    <div>
      <h1 className={styles.title}>My Course</h1>
      <form onSubmit={onSubmit}>
        <input
          className={styles.idInput}
          required
          onChange={onChange}
          placeholder="아이디"
          name="id"
          value={id}
          type="text"
        />
        <br />
        <input
          className={styles.pwdInput}
          onChange={onChange}
          required
          placeholder="비밀번호"
          name="password"
          value={password}
          type="password"
        />
        <br />
        <button className={styles.submitBtn}>로그인</button>
      </form>
    </div>
  );
};

export default Login;
