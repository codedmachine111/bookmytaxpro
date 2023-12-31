import "./SignUpForm.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Button } from "../../components/Button/Button";
import { UserContext } from "../../App";
import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export const SignUpForm = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useContext(UserContext);

  const resetFormFields = () => {
    document.getElementsByClassName("signup-form")[0].reset();
  };

  const initialValues = {
    name: "",
    password: "",
    email: "",
    confirmPassword: "",
  };

  const onSignupSubmitHandler = async (values) => {
    const userObject = {
      firstName: values.name,
      password: values.password,
      email: values.email,
    };

    setLoading(true);
    if (values.password === values.confirmPassword) {
      axios
        .post(`https://bmt-server.vercel.app/auth/signup`, userObject)
        .then((res) => {
          if (res.data.message === "User Created!") {
            alert(res.data.message);
            setLoading(false);
            props.toggleAuth();
          }
        });
    } else {
      alert("Passwords don't match");
      setLoading(false);
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSignupSubmitHandler}>
        <Form className="signup-form">
          <h2>Create new account</h2>
          <p>
            <span id="bold">Signup</span> to create an account and book a service.
          </p>
          <Field
            id="signup-input"
            name="name"
            type="text"
            autoComplete="off"
            placeholder="First name"
          />
          <ErrorMessage name="name" />
          <Field
            id="signup-input"
            name="email"
            type="email"
            autoComplete="off"
            placeholder="Enter a valid email"
          />
          <ErrorMessage name="email" />
          <Field
            id="signup-input"
            name="password"
            type="password"
            autoComplete="off"
            minLength="8"
            placeholder="Password"
          />
          <ErrorMessage name="password" />
          <Field
            id="signup-input"
            name="confirmPassword"
            autoComplete="off"
            type="password"
            minLength="8"
            placeholder="Confirm password"
          />
          <ErrorMessage name="confirmPassword" />

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
                title="SIGNUP"
                onSubmit={onSignupSubmitHandler}
              />
            </>
          )}

          <p id="auth-redirect">
            Have an account?{" "}
            <Link to="/auth" onClick={() => props.toggleAuth()}>
              Login
            </Link>
          </p>
        </Form>
      </Formik>
    </>
  );
};
