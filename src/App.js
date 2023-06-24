import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {LandingPage} from "./pages/LandingPage/LandingPage";
import {HomePage} from "./pages/HomePage/HomePage";
import {Auth} from "./pages/Auth/Auth";
import { createContext, useState } from "react";

export const UserContext = createContext();
export const BookingsContext = createContext();

function App() {
  const [authUser, setAuthUser] = useState({
    status: false,
    name: "",
    userId: 0,
  });
  const [listOfBookings, setListOfBookings] = useState([]);

  return (
    <div className="App">
      <UserContext.Provider value={{ authUser, setAuthUser }}>
        <BookingsContext.Provider value={{ listOfBookings, setListOfBookings }}>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </Router>
        </BookingsContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
