import { useEffect, useState } from "react";
import API from "../api";
import { useParams } from "react-router-dom";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    API.get(`/events/${id}`).then((res) => setEvent(res.data));
  }, [id]);

  const vote = async (optionId) => {
    await API.post(`/polls/${id}/vote`, { optionId });
    const updated = await API.get(`/events/${id}`);
    setEvent(updated.data);
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div>
      <h2>{event.title}</h2>
      <p>{event.description}</p>

      <h3>{event.poll.question}</h3>
      <ul>
        {event.poll.options.map((opt) => (
          <li key={opt._id}>
            {opt.option} - {opt.votes.length} votes
            <button onClick={() => vote(opt._id)}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
