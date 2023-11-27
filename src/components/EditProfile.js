import axios from "axios";
const EditProfile = () => {
  const onClick = () => {
    const token = localStorage.getItem("token");
    axios
      .put(
        "http://localhost:8080/member",
        {
          password: "pjy26489!",
          newPassword: "pjy26489",
          major: "software",
          stdnum: 2020039028,
          grade: 6,
        },
        {
          headers: {
            Accept: "application/json;charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <button onClick={onClick}>edit</button>
    </div>
  );
};
export default EditProfile;
