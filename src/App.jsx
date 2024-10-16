import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventList from "./Components/EventList";
import EventDetails from "./Components/EventDetails";
import SignIn from "./Components/SignIn";
import eventsData from "./Data/EventsData";
import { useState } from "react";
import { AuthProvider } from "./Components/AuthContext";

const App = () => {
  const [events, setEvents] = useState(eventsData);

  const updateAvailableSeats = (eventId, ticketCount) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? { ...event, availableSeats: event.availableSeats - ticketCount }
          : event
      )
    );
  };

  return (
    <AuthProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<EventList events={events} />} />
          <Route
            path="/events/:id"
            element={
              <EventDetails
                events={events}
                updateAvailableSeats={updateAvailableSeats}
              />
            }
          />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
