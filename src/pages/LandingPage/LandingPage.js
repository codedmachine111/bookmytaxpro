import "./LandingPage.scss";
import { Button } from "../../components/Button/Button";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <>
      <div className="landing-container">
        <div className="landing-content">
          <div className="content">
            <h1>BookmyTaxpro</h1>
            <p>
              We streamline the process of finding and booking Chartered
              Accountants by providing a user-friendly web application that
              enables users to easily search for financial services, select from
              a pool of expert CAs, and book consultations tailored to their
              specific needs.
            </p>
            <Link to="/auth">
              <Button title="get started" />
            </Link>
          </div>
        </div>
        <div className="landing-timer-container">
          <LoginForm />
        </div>
      </div>
    </>
  );
};
