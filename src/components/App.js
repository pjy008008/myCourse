import { useState } from "react";
import AppRouter from "./Router";
import { useEffect } from "react";
import React from "react";

function App() {
  //css 할 시 useState안의 값 변경해놓고 하면 편함
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <AppRouter setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App;
