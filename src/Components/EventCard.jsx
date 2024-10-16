/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "../Assets/EventCard.css";

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <img src={event.imageUrl} alt={event.title} className="event-image" />
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p>Category: {event.category}</p>
      <p>Seats Available: {event.availableSeats}</p>
      <Link to={`/events/${event.id}`} className="view-details-button">
        View Details
      </Link>
    </div>
  );
};

export default EventCard;
