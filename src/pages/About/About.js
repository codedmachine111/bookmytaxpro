import React from "react";
import "./About.scss";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";

export const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-page-container">
        <div className="about-page-content">
          <h1>
            About <span id="diff">BMT</span>
          </h1>
          <p>
            Welcome to our BookmyTaxpro! We provide a platform for booking
            financial services with expert professionals. Our goal is to make
            your financial management easier and more efficient.
          </p>
          <p>
            Our goal is to provide users with a unique and interactive
            experience. We want to make financial management easier and more
            efficient.
          </p>
          <h2>Key Features:</h2>
          <ul>
            <li>
              <span>Booking Financial Services with Experts:</span> You can easily book
              various financial services offered by our team of experts. Whether
              you need a financial audit, financial planning, or assistance with
              handling taxes, our experts are here to help you.
            </li>
            <li>
              <span>AI-Powered Chatbot Integration:</span> Our app is equipped with an
              AI-powered chatbot that will guide you through the process of
              navigating the app and successfully booking a service. You can ask
              the chatbot any questions or seek assistance at any stage.
            </li>
            <li>
              <span>Manage Services:</span> Once you've booked a service, you can easily
              manage it through our app. You can mark a service as complete,
              cancel it if needed, and even add a rating to the expert who
              provided the service.
            </li>
          </ul>
          <h2>Our Goal:</h2>
          <p>
            We strive to provide the best experience for our users and ensure
            that all your financial needs are met. If you have any questions or
            need further assistance, feel free to reach out to our support team.
          </p>
          <h2>Get Started:</h2>
          <p>
            Book a service{" "}
            <Link to="/book" id="link">
              NOW!
            </Link>{" "}
          </p>
        </div>
      </div>
    </>
  );
};
