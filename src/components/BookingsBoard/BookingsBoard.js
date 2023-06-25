import "./BookingsBoard.scss";
import { useContext, useState, useEffect } from "react";
import { BookingsContext } from "../../App";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { BookingCard } from "../BookingCard/BookingCard";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";

export const BookingsBoard = () => {
  const { listOfBookings, setListOfBookings } = useContext(BookingsContext);
  const [loading, setLoading] = useState(false);
  const { authUser } = useContext(UserContext);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/booking/all/${authUser.userId}`,{
        headers: {
          accessToken: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
          setLoading(false);
        } else {
          setListOfBookings(res.data);
          setLoading(false);
        }
      });
  }, []);

  return (
    <>
      <div className="bookings-board-container">
        {loading ? (
          <>
            <div id="loading">
              <CircularProgress id="loadbar" />
            </div>
          </>
        ) : (
          <>
            <div className="bookings-list">
              {listOfBookings.length > 0 ? (
                listOfBookings.map((booking, key) => {
                  return (
                    <BookingCard
                      key={key}
                      ticketId={booking.id}
                      service={booking.service}
                      expertName={booking.expertName}
                      date={booking.date}
                      status={booking.status}
                    />
                  );
                })
              ) : (
                <>
                  <h2>No bookings found</h2>
                  <p><Link to={"/book"} id="nav-book">Book</Link> a service now.</p>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
