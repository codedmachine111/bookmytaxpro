import "./Navbar.scss";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  const { setAuthUser } = useContext(UserContext);

  const navigate = useNavigate();

  const onSignoutHandler = () => {
    localStorage.removeItem("token");
    setAuthUser({ status: false, name: "", userId: 0 });
    navigate("/auth");
  };

  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <span id="diff">BMT</span>
        </Link>
      </div>
      <div className="nav-menu">
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <i className="fa fa-bars"></i>
        </label>
        <ul className="list">
          <li id="active">
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about" id="d">
              About
            </Link>
          </li>
          <li>
            <Link to="/book" id="d">
              Book
            </Link>
          </li>
          <li>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              id="signout-icon"
              onClick={onSignoutHandler}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
};
