import "./BookPage.scss";
import { FilteredList } from "../../components/FilteredList/FilteredList";
import { useState, useContext, useEffect } from "react";
import { ExpertsContext } from "../../App";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export const BookPage = () => {
  const { listOfExperts, setListOfExperts } = useContext(ExpertsContext);
  const [filteredExperts, setFilteredExperts] = useState(listOfExperts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/expert/all")
      .then((response) => {
        setListOfExperts(response.data);
        setFilteredExperts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const onChangeHandler = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filteredExperts = listOfExperts.filter((expert) => {
      const serviceName = expert.services.toLowerCase();
      const expertName = expert.name.toLowerCase();
      return (
        serviceName.includes(searchQuery) || expertName.includes(searchQuery)
      );
    });
    setFilteredExperts(filteredExperts);
  };

  return (
    <>
      <div className="book-page-container">
        <div className="book-page-content">
          <h1>Search for a service</h1>
          <p>
            Book experts on the services you need. We currently offer :{" "}
            <span id="bold-s">Financial Audit</span>,{" "}
            <span id="bold-s">Financial Planning</span>, and{" "}
            <span id="bold-s">Handling Taxes</span>
          </p>
          <input
            id="search-box"
            type="search"
            placeholder="Search for a service or an expert. Eg: Financial Audit, Harshad Mehta"
            onChange={onChangeHandler}
          />
        </div>
        <div className="book-page-filtered-list">
          {loading ? (
            <>
              <div id="loading">
                <CircularProgress id="loadbar" />
              </div>
            </>
          ) : (
            <>
              <h2>Available Experts: </h2>
              <FilteredList listOfExperts={filteredExperts} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
