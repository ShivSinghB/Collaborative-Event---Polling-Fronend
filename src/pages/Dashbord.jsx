import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [createdEvents, setCreatedEvents] = useState([]);
  const [invitedEvents, setInvitedEvents] = useState([]);

  useEffect(() => {
    API.get("/events").then((res) => {
      console.log(res.data); // 👀 check structure
      setCreatedEvents(res.data.events?.created || []);
      setInvitedEvents(res.data.events?.invited || []);
    });
  }, []);

  return (
    <div>
      <h2>My Created Events</h2>
      <ul>
        {createdEvents.length > 0 ? (
          createdEvents.map((ev) => (
            <li key={ev._id}>
              <Link to={`/event/${ev._id}`}>{ev.title}</Link>
            </li>
          ))
        ) : (
          <p>No created events</p>
        )}
      </ul>

      <h2>Events I'm Invited To</h2>
      <ul>
        {invitedEvents.length > 0 ? (
          invitedEvents.map((ev) => (
            <li key={ev._id}>
              <Link to={`/event/${ev._id}`}>{ev.title}</Link>
            </li>
          ))
        ) : (
          <p>No invites yet</p>
        )}
      </ul>
    </div>
  );
}
