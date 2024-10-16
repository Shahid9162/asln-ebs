/* eslint-disable react/prop-types */
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../Components/AuthContext";
import "../Assets/EventDetails.css";

const EventDetails = ({ events, updateAvailableSeats }) => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const foundEvent = events.find((event) => event.id === parseInt(id));
    setEvent(foundEvent);
  }, [id, events]);

  const handleBooking = () => {
    if (!auth.user) {
      navigate("/signin");
      return;
    }
    if (event.availableSeats >= ticketCount) {
      updateAvailableSeats(event.id, ticketCount);
      alert(`Successfully booked ${ticketCount} ticket(s)!`);
    } else {
      alert("Not enough seats available");
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-details">
      <h2>{event.title}</h2>
      <p>Category: {event.category}</p>
      <p>Date: {event.date}</p>
      <p>Price: ${event.price}</p>
      <p>Seats Available: {event.availableSeats}</p>
      <div>
        <span>Number of Tickets: {ticketCount}</span>
        <div className="ticket-counter">
          <button
            onClick={() => setTicketCount(ticketCount - 1)}
            disabled={ticketCount === 1}
            className="ticket-button"
          >
            -
          </button>
          <button
            onClick={() => setTicketCount(ticketCount + 1)}
            disabled={ticketCount >= event.availableSeats}
            className="ticket-button"
          >
            +
          </button>
        </div>
      </div>
      <button onClick={handleBooking} className="book-ticket-button">
        Book Ticket
      </button>
    </div>
  );
};

export default EventDetails;
