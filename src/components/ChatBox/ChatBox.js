import "./ChatBox.scss";
import { Formik, Form, Field } from "formik";
import { Button } from "../../components/Button/Button";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import {ToggleChatBotContext, BookingsContext, ExpertsContext} from "../../App";
import { ChatMessage } from "../ChatMessage/ChatMessage";
import { CircularProgress } from "@mui/material";
const { Configuration, OpenAIApi } = require("openai");

export const ChatBox = () => {
  // TO FETCH ALL TRANSACTIONS, USER INCOME AND EXPENSES
  const { listOfBookings } = useContext(BookingsContext);
  const { listOfExperts } = useContext(ExpertsContext);

  const { setIsChatBotOpen } = useContext(ToggleChatBotContext);

  const [loading, setLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const initialValues = {
    message: "",
  };

  const handleCancel = () => {
    setIsChatBotOpen(false);
    localStorage.removeItem("chatMessages");
    window.location.reload();
  };

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    const dateObj = new Date(dateString);
    const formattedDate = dateObj.toLocaleDateString("en-GB", options);
    return formattedDate;
  };

  const resetForm = () => {
    const formElement = document.getElementById("chatbot-form");
    if (formElement) {
      formElement.reset();
    }
  };

  const saveChatMessagesToStorage = (messages) => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  };

  const loadChatMessagesFromStorage = () => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      setChatMessages(JSON.parse(storedMessages));
    }
  };

  useEffect(() => {
    loadChatMessagesFromStorage();
  }, []);
  const onChatRequestHandler = async (values) => {
    const userObject = {
      message: values.message,
    };

    setLoading(true);

    let expertsString = "";
    listOfExperts.forEach((expert) => {
      expertsString += `"${expert.name}, ${expert.services}, ${expert.rating}"\n`;
    });

    let bookingsString = "";
    listOfBookings.forEach((booking) => {
      bookingsString += `"${booking.id}, ${booking.service}, ${formatDate(booking.date)}, ${booking.expertName}"\n`;
    });
    let customPrompt = `Your Role is to become a ChatBot for a web-app names "bookmyTaxpro" where users can browse among 10 financial experts who offer different services. Users can view all their bookings of services on the homepage. If they want to book a service, they can navigate to the "Book" page and search for their required services and the experts list will be filtered according to the search query based on wheather they are searching for service name or expert name.
      Your task is to answer the user queries and help them book a service. These are the user's existing bookings (format : serviceTicket, service, date, expertName): ${bookingsString}\n The date today is ${formatDate(Date.now())} and these are the available experts (format : Name, services, rating): ${expertsString}. Based on this information, answer the user queries and help them navigate to the booking page, suggest them the best expert for their service based on the expert's rating and help them book a service. If all expert's rating for that service is same, then suggest the first expert in the list.
      User Query: ${userObject.message}\n Keep your response to the point and short.
    `;
    console.log(customPrompt);
    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: customPrompt,
        max_tokens: 900,
      });
      const response = completion.data.choices[0].text;
      const newMessage = {
        id: Date.now(),
        message: userObject.message,
        response: response,
      };
      setLoading(false);
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      saveChatMessagesToStorage([...chatMessages, newMessage]);
      resetForm();
    } catch (err) {
      console.log(err);
      resetForm();
      setLoading(false);
    }
  };
  // chatMessages.forEach((message) => {
  //   console.log(message.response);
  // });

  let defualtMessage =
    "Hi im your AI ChatBot! You can ask me \n1. How do i book a service? \n2. How do i book a service with an expert? \n3. When is my next service? \n4. Where do i need to go to search for a service? \n5. How to search for a service?\nAnd similar questions...";
  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3>AI ChatBot</h3>
        <FontAwesomeIcon icon={faX} id="cancel" onClick={handleCancel} />
      </div>
      <div className="chatbot-body">
        <div className="chatbot-messages">
          {chatMessages.length > 0 ? (
            chatMessages.map((message) => {
              return <ChatMessage key={message.id} message={message.message} />;
            })
          ) : (
            <>
              <ChatMessage message={defualtMessage} />
            </>
          )}
        </div>

        <Formik initialValues={initialValues} onSubmit={onChatRequestHandler}>
          {loading ? (
            <>
              <div id="cb-loading">
                <CircularProgress id="cb-loadbar" />
              </div>
            </>
          ) : (
            <>
              <Form className="chatbot-form" id="chatbot-form">
                <Field
                  id="cb-msg-input"
                  name="message"
                  type="text"
                  placeholder="Eg. How do i book a service?"
                  autoComplete="off"
                  required={true}
                />

                <Button
                  title="ASK"
                  type="submit"
                  onSubmit={onChatRequestHandler}
                />
              </Form>
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};
