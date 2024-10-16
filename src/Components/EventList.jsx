/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from "react";
import { useAuth } from "./AuthContext";
import EventCard from "./EventCard";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import Pagination from "./Pagination";
import Loading from "./Loading";
import Error from "./Error";
import "../Assets/EventList.css";

const EventList = ({ events }) => {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 4;
  const auth = useAuth();

  useEffect(() => {
    setFilteredEvents(events);
    setLoading(false);
  }, [events]);

  const handleSearch = (searchTerm) => {
    const filtered = events.filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
    setCurrentPage(1);
  };

  const handleFilter = (category) => {
    if (category === "All") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) => event.category === category);
      setFilteredEvents(filtered);
    }
    setCurrentPage(1);
  };

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;

  const currentEvents = useMemo(() => {
    return filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  }, [filteredEvents, indexOfFirstEvent, indexOfLastEvent]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="event-list-container">
      <div className="title-container">
        <h1 className="title"> ASLN Event Booking System</h1>
        {auth.user && (
          <div className="welcome-user">
            <span>Welcome, {auth.user.username}</span>
            <button onClick={auth.signOut} className="signout-button">
              Sign Out
            </button>
          </div>
        )}
      </div>
      <div className="search-filter-container">
        <SearchBar onSearch={handleSearch} />
        <FilterBar onFilter={handleFilter} />
      </div>
      <div className="event-list">
        {currentEvents.length > 0 ? (
          currentEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
      <Pagination
        totalEvents={filteredEvents.length}
        eventsPerPage={eventsPerPage}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default EventList;
