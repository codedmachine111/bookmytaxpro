import "./ExpertCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button/Button";
import { useState, useContext } from "react";
import { ExpertsContext } from "../../App";
import { UserContext } from "../../App";
import { CircularProgress } from "@mui/material";
import axios from "axios";

export const ExpertCard = (props) => {
  const { name, rating, services, totalRatings } = props;
  const [editing, setEditing] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(name);
  const [loading, setLoading] = useState(false);
  const { authUser } = useContext(UserContext);
  const { listOfExperts } = useContext(ExpertsContext);

  const onEditHandler = () => {
    setEditing(true);
  };

  const onSaveEditHandler = () => {
    setLoading(true);
    const expertObject = {
      expertName: selectedExpert,
      date: document.getElementById("date").value,
      service: document.getElementById("service").value,
      userId: authUser.userId,
    };
    axios
      .post(
        `http://localhost:3001/booking/add`,
        {
          expertName: expertObject.expertName,
          date: expertObject.date,
          service: expertObject.service,
          userId: expertObject.userId,
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
          alert("Booking Successful!");
          window.location.reload();
          setLoading(false);
          setEditing(false);
        }
      });
  };

  const onCancelEditHandler = () => {
    setEditing(false);
  };
  
  return (
    <>
      <div className="expert-card-container">
        {!editing ? (
          <>
            <div className="expert-card-icon">
              <FontAwesomeIcon icon={faUser} id="expert-icon" />
            </div>
            <div className="expert-card-details">
              <div className="expert-card-name">{name}</div>
              <div className="expert-card-rating">Rating: {rating}</div>
              <div className="expert-card-total-ratings">Total Ratings: {totalRatings}</div>
              <div className="expert-card-services">Services: {services}</div>
            </div>
            <div className="expert-card-button">
              <Button title="Book Now" onClick={onEditHandler} />
            </div>
          </>
        ) : (
          <>
            <div className="edit-form">
              <div className="edit-form-data">
                <h1>{selectedExpert}</h1>
                <div className="edit-form-date">
                  <label htmlFor="date">Date </label>
                  <input type="date" id="date" name="date" />
                </div>
                <div className="edit-form-services">
                  <label htmlFor="service">Service </label>
                  <select id="service" name="service">
                    <option value="Handling Taxes">Handling Taxes</option>
                    <option value="Financial Audit">Financial Audit</option>
                    <option value="Financial Planning">
                      Financial Planning
                    </option>
                  </select>
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
                  <div className="edit-form-buttons">
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
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
