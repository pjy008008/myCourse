import axios from "axios";
const GetSubject = () => {
  const onClick = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8080/subject", {
        headers: {
          Accept: "application/json;charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <button onClick={onClick}>Getsubject</button>
    </div>
  );
};
export default GetSubject;
