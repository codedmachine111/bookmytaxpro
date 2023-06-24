import "./BookingCard.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Button } from "../Button/Button";

export const BookingCard = (props) => {
  const { service, date, status, expertName, ticketId } = props;
  const [loading, setLoading] = useState(false);
  
  const onMarkCompleteHandler = () => {
    setLoading(true);
    axios
      .put(
        `http://localhost:3001/booking/update/`,
        {
          status: "completed",
          id: ticketId,
        },
        {
          headers: {
            accessToken: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
          setLoading(false);
        } else {
          setLoading(false);
          window.location.reload();
        }
      });
  };
  return (
    <>
      <div className="booking-card-container">
        <div className="booking-card-info">
          <h2>{service}</h2>
          <p>Expert : {expertName}</p>
        </div>
        <div className="booking-card-date">
          <p>{date}</p>
        </div>
        <div className="booking-card-status">
          {status === "pending" ? (
            <>
              <p>
                Status : <span id="pending">{status}</span>
              </p>
              {loading ? (
                <>
                  <div id="loading">
                    <CircularProgress id="loadbar" />
                  </div>
                </>
              ) : (
                <>
                  <Button
                    title="mark as completed"
                    onClick={onMarkCompleteHandler}
                  />
                </>
              )}
            </>
          ) : (
            <>
              <p>
                Status : <span id="completed">{status}</span>
                <Button title="Add rating" id="add-rating"/>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};
