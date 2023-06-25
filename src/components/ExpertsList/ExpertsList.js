import "./ExpertsList.scss";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { ExpertsContext } from "../../App";
import { ExpertCard } from "../ExpertCard/ExpertCard";
import { CircularProgress } from "@mui/material";

export const ExpertsList = () => {
  const { listOfExperts, setListOfExperts } = useContext(ExpertsContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/expert/all")
      .then((response) => {
        setListOfExperts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="experts-list-container">
        {loading ? (
          <>
            <div id="loading">
              <CircularProgress id="loadbar" />
            </div>
          </>
        ) : (
          <>
            <div className="experts-list">
              {listOfExperts.map((expert, key) => {
                return (
                  <>
                    <ExpertCard
                      key={key}
                      name={expert.name}
                      rating={expert.rating}
                      services={expert.services}
                      totalRatings={expert.totalRatings}
                    />
                  </>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};
