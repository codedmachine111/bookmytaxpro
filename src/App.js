import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { Auth } from "./pages/Auth/Auth";
import { createContext, useState } from "react";

export const UserContext = createContext();
export const BookingsContext = createContext();
export const ExpertsContext = createContext();

function App() {
  const [authUser, setAuthUser] = useState({
    status: false,
    name: "",
    userId: 0,
  });
  const [listOfBookings, setListOfBookings] = useState([]);
  const [listOfExperts, setListOfExperts] = useState([]);

  return (
    <div className="App">
      <UserContext.Provider value={{ authUser, setAuthUser }}>
        <BookingsContext.Provider value={{ listOfBookings, setListOfBookings }}>
          <ExpertsContext.Provider value={{ listOfExperts, setListOfExperts }}>
            <Router>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/auth" element={<Auth />} />
              </Routes>
            </Router>
          </ExpertsContext.Provider>
        </BookingsContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
