import "./HomePage.scss";
import { UserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Navbar } from "../../components/Navbar/Navbar";
import { BookingsContext } from "../../App";

export const HomePage = () => {
  const { authUser, setAuthUser } = useContext(UserContext);
  const { listOfBookings, setListOfBookings } = useContext(BookingsContext);
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3001/auth/verify", {
        headers: {
          accessToken: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
          setAuthUser({
            status: false,
            name: "",
            userId: 0,
          });
          setLoading(false);
        } else {
          setAuthUser({
            status: true,
            name: res.data.user.name,
            userId: res.data.user.id,
          });
          setLoading(false);
        }
      });
  }, []);

  // const toggleChatBox = () => {
  //   setIsChatBotOpen(!isChatBotOpen);
  // };
  return (
    <>
      <Navbar />
      <div className="home-container">
        {loading ? (
          <>
            <div id="loading">
              <CircularProgress id="loadbar" />
            </div>
          </>
        ) : (
          <>
            <div className="home-content">
              <div className="home-title">
                <h1>
                  Hello, <span>{authUser.name}!</span>
                </h1>
              </div>
            </div>

            {/* {isChatBotOpen ? (
              <>
                <div className="chatbot-cont">
                  <ChatBox />
                </div>
              </>
            ) : (
              <>
                <div className="chatbot-icon" onClick={toggleChatBox}>
                  <FontAwesomeIcon icon={faRobot} id="bot-icon" />
                </div>
              </>
            )} */}
          </>
        )}
      </div>
    </>
  );
};
