import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [voting, setVoting] = useState(false);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`/events/${id}`);
      setEvent(data.event);
      setLoading(false);
    } catch (err) {
      console.error(err.response?.data);
      setError("Failed to load event");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!event) return null;

  const poll = event.poll;

  const handleOptionChange = (optionId) => {
    if (poll.allowMultipleVotes) {
      setSelectedOptions((prev) =>
        prev.includes(optionId)
          ? prev.filter((id) => id !== optionId)
          : [...prev, optionId]
      );
    } else {
      setSelectedOptions([optionId]);
    }
  };

  const handleVote = async () => {
    if (selectedOptions.length === 0) return alert("Select an option");
    try {
      setVoting(true);
      for (let optionId of selectedOptions) {
        await API.post(`/polls/${poll._id}/vote`, { optionId });
      }
      setSelectedOptions([]);
      fetchEvent(); // Refresh poll results
      setVoting(false);
    } catch (err) {
      console.error(err.response?.data);
      setVoting(false);
      alert(err.response?.data?.message || "Voting failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <p className="text-gray-700 mb-4">{event.description}</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Poll: {poll.question}</h2>
        <div className="space-y-2">
          {poll.options.map((opt) => (
            <label key={opt.id} className="flex items-center gap-2">
              <input
                type={poll.allowMultipleVotes ? "checkbox" : "radio"}
                name="pollOption"
                value={opt.id}
                checked={selectedOptions.includes(opt.id)}
                onChange={() => handleOptionChange(opt.id)}
              />
              <span>{opt.text} ({opt.votes.length} votes)</span>
            </label>
          ))}
        </div>
        <button
          onClick={handleVote}
          disabled={voting}
          className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          {voting ? "Voting..." : "Vote"}
        </button>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Participants</h2>
        <ul className="space-y-1">
          {event.participants.map((p) => (
            <li key={p.user._id} className="flex items-center gap-2">
              <img src={p.user.avatar} alt={p.user.name} className="w-6 h-6 rounded-full" />
              <span>{p.user.name}</span>
              <span className="text-gray-500 text-sm">({p.status})</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
