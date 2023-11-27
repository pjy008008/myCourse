import { useState } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import styles from "./Auth.module.css";
const Auth = ({ setIsLoggedIn }) => {
  const [toggle, setToggle] = useState(false);
  const onClick = () => {
    setToggle((prev) => !prev);
  };
  
  return (
    <div>
      {toggle ? (
        <Register setToggle={setToggle} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Login setToggle={setToggle} setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
};

export default Auth;
