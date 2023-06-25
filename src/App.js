import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { Auth } from "./pages/Auth/Auth";
import { createContext, useState } from "react";
import { BookPage } from "./pages/BookPage/BookPage";
import { About } from "./pages/About/About";

export const UserContext = createContext();
export const BookingsContext = createContext();
export const ExpertsContext = createContext();
export const ToggleChatBotContext = createContext();

function App() {
  const [authUser, setAuthUser] = useState({
    status: false,
    name: "",
    userId: 0,
  });
  const [listOfBookings, setListOfBookings] = useState([]);
  const [listOfExperts, setListOfExperts] = useState([]);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  return (
    <div className="App">
      <UserContext.Provider value={{ authUser, setAuthUser }}>
        <BookingsContext.Provider value={{ listOfBookings, setListOfBookings }}>
          <ExpertsContext.Provider value={{ listOfExperts, setListOfExperts }}>
            <ToggleChatBotContext.Provider
              value={{ isChatBotOpen, setIsChatBotOpen }}
            >
              <Router>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/book" element={<BookPage />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </Router>
            </ToggleChatBotContext.Provider>
          </ExpertsContext.Provider>
        </BookingsContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
