import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const OtherProfile = () => {
  const params = useParams();
  const [userData, setUserData] = useState(null);

  const getSem = (key) => {
    if (key === 0) {
      return <p>1학년 1학기</p>;
    } else if (key === 1) {
      return <p>1학년 2학기</p>;
    } else if (key === 2) {
      return <p>2학년 1학기</p>;
    } else if (key === 3) {
      return <p>2학년 2학기</p>;
    } else if (key === 4) {
      return <p>3학년 1학기</p>;
    } else if (key === 5) {
      return <p>3학년 2학기</p>;
    } else if (key === 6) {
      return <p>4학년 1학기</p>;
    } else if (key === 7) {
      return <p>4학년 2학기</p>;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/member/everyone",
          {
            headers: {
              Accept: "application/json;charset=UTF-8",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userWithMatchingAccount = response.data.data.find(
          (user) => user.account === params.id
        );
        setUserData(userWithMatchingAccount);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [params.id]); // params.id를 의존성으로 추가

  return (
    <div>
      {userData ? (
        <div>
          <h2>시간표</h2>
          {userData.subject.map((semester, i) => (
            <div key={i}>
              <h3>{getSem(i)}</h3>
              {semester.map((subjectCode, j) => (
                <p key={j}>{`과목: ${subjectCode}`}</p>
              ))}
            </div>
          ))}
          {/* 여기에 다른 사용자 정보를 표시하세요 */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default OtherProfile;
