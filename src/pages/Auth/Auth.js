import "./Auth.scss";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { SignUpForm } from "../../components/SignUpForm/SignUpForm";
import { useState } from "react";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);

  const toggleAuth = () => {
    setIsLogin(!isLogin);
  }

  return (
    <>
        <div className="auth-page-container">
          <div className="auth-page-content">
            {!isLogin ? <SignUpForm toggleAuth={toggleAuth}/> : <LoginForm toggleAuth={toggleAuth}/>}
          </div>
        </div>
    </>
  );
};
