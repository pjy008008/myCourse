import { useState } from "react";
import AppRouter from "./Router";
import { useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus) {
      setIsLoggedIn(JSON.parse(storedLoginStatus));
    }
  }, []);

  return (
    <div>
      <AppRouter setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App;
