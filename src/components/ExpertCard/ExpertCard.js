import "./ExpertCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button/Button";
import { useState, useContext } from "react";
import { ExpertsContext } from "../../App";

export const ExpertCard = (props) => {
  const { name, rating, services } = props;
  const [editing, setEditing] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(name);

  const { listOfExperts } = useContext(ExpertsContext);

  const onEditHandler = () => {
    setEditing(true);
  };

  const onSaveEditHandler = () => {
    setEditing(false);
  };

  const onCancelEditHandler = () => {
    setEditing(false);
  };

  const handleExpertChange = (e) => {
    setSelectedExpert(e.target.value);
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
            </div>
          </>
        )}
      </div>
    </>
  );
};
