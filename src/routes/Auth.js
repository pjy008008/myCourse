import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import styles from "./Auth.module.css";
const Auth = ({ setIsLoggedIn }) => {
  const [toggle, setToggle] = useState(false);
  const onClick = () => {
    setToggle((prev) => !prev);
  };
  
  return (
    <div>
      {toggle ? (
        <Register setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
      <button className={styles.toggleBtn} onClick={onClick}>
        {toggle ? <span>로그인으로 이동</span> : <span>회원가입으로 이동</span>}
      </button>
    </div>
  );
};

export default Auth;
