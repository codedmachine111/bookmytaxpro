import "./BookingCard.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Button } from "../Button/Button";
import { parse } from "@fortawesome/fontawesome-svg-core";

export const BookingCard = (props) => {
  const { service, date, status, expertName, ticketId } = props;
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isRated, setIsRated] = useState(false);

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

  const onCancelBookingHandler = () => {
    setLoading(true);
    axios
      .put(
        `http://localhost:3001/booking/update/`,
        {
          status: "cancelled",
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
          setIsCancelled(true);
          window.location.reload();
        }
      });
  };
  const onEditHandler = () => {
    setEditing(true);
  };

  const onCancelEditHandler = () => {
    setEditing(false);
  };

  const onSaveEditHandler = () => {
    setLoading(true);
    const rating = parseInt(document.getElementById("rating").value);

    axios
      .get(`http://localhost:3001/expert/byName`, {
        expertName: expertName,
      })
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
          setLoading(false);
        } else {
          const expert = res.data;
          const expertId = expert.id;
          const currentRating = expert.rating ? expert.rating : 0;
          const totalRatings = expert.totalRatings ? expert.totalRatings : 0;

          // Calculate the new average rating
          const newTotalRatings = totalRatings + 1;
          const newRating =
            ((currentRating * totalRatings + rating) / newTotalRatings).toFixed(2);

          // Update the expert's rating and totalRatings in the database
          axios
            .put(
              `http://localhost:3001/expert/update/`,
              {
                rating: parseFloat(newRating),
                totalRatings: newTotalRatings,
                expertName: expertName,
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
              } else {
                setLoading(false);
                setIsRated(true);
                window.location.reload();
              }
            });
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
                  <Button
                    title="Cancel Booking"
                    id="cancel-booking"
                    onClick={onCancelBookingHandler}
                  />
                </>
              )}
            </>
          ) : (
            <>
              <p>
                Status : <span id="completed">{status}</span>
                {editing ? (
                  <>
                    <div className="book-edit-form">
                      <div className="book-edit-form-data">
                        <div className="book-edit-form-rating">
                          <label htmlFor="rating">Rating/5</label>
                          <input
                            type="number"
                            id="rating"
                            name="rating"
                            max={5}
                          />
                        </div>
                      </div>
                      {loading ? (
                        <>
                          <div id="form-loading">
                            <CircularProgress id="form-loadbar" />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="book-edit-form-buttons">
                            {!isCancelled ? (
                              <>
                                <Button
                                  title="Save"
                                  onClick={onSaveEditHandler}
                                  icon="faCheck"
                                  id="save-icon"
                                />
                                <Button
                                  title="Cancel"
                                  onClick={onCancelEditHandler}
                                  icon="faXmark"
                                  id="cancel-icon"
                                />
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    {(isRated || isCancelled) ? (
                      <></>
                    ) : (
                      <>
                        <Button
                          title="Add rating"
                          id="add-rating"
                          onClick={onEditHandler}
                        />
                      </>
                    )}
                  </>
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
};
