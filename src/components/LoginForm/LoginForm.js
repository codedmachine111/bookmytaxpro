import "./LoginForm.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { UserContext } from "../../App";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Button } from "../Button/Button";

export const LoginForm = (props) => {
  const { setAuthUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const resetFormFields = () => {
    document.getElementsByClassName("login-form")[0].reset();
  };

  const initialValues = {
    email: "",
    password: "",
  };

  // FUNCTION TO HANDLE LOGIN SUBMISSION
  const onLoginSubmitHandler = async (values) => {
    const userObject = {
      email: values.email,
      password: values.password,
    };
    setLoading(true);
    axios.post(`https://bmt-server.vercel.app/auth/login`, userObject).then((res) => {
      if (res.data.message === "Login Successful") {
        resetFormFields();
        setAuthUser({
          status: true,
          name: res.data.name,
          userId: res.data.userId,
        });
        localStorage.setItem("token", res.data.accessToken);
        navigate("/home");
        setLoading(false);
      } else {
        alert(res.data.message);
        setLoading(false);
      }
    });
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onLoginSubmitHandler}>
        <Form className="login-form">
          <h2>Have an account?</h2>
          <p>
            <span id="bold">Login</span> to enter and book a service.
          </p>
          <Field
            id="login-input"
            name="email"
            type="email"
            placeholder="Enter your email"
            required={true}
          />
          <ErrorMessage name="email" />
          <Field
            id="login-input"
            name="password"
            type="password"
            placeholder="Password"
            required={true}
          />
          <ErrorMessage name="password" />

          {loading ? (
            <>
              <div id="loading">
                <CircularProgress id="loadbar"/>
              </div>
            </>
          ) : (
            <>
              <Button
                type="submit"
                title="LOGIN"
                onSubmit={onLoginSubmitHandler}
              />
            </>
          )}

          <p id="auth-redirect">
            Don't have an account?{" "}
            <Link to="/auth" onClick={() => props.toggleAuth()}>
              Signup
            </Link>
          </p>
        </Form>
      </Formik>
    </>
  );
};
