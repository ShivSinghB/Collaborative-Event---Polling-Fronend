import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

export default function PollList() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPolls = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/events", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Extract polls from created + invited events
        const { created = [], invited = [] } = res.data;
        const allEvents = [...created, ...invited];
        const userPolls = allEvents
          .map((event) => event.poll)
          .filter((poll) => poll); // ignore null

        setPolls(userPolls);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user polls:", err);
        setLoading(false);
      }
    };

    fetchUserPolls();
  }, []);

  if (loading) return <p className="p-6">Loading your polls...</p>;
  if (!polls.length) return <p className="p-6">You don’t have any polls yet.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Polls</h2>
      <div className="space-y-4">
        {polls.map((poll) => (
          <div
            key={poll._id}
            className="p-4 border rounded shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">{poll.question}</h3>
            <p className="text-sm text-gray-600">
              Event: {poll.event?.title || "No event"}
            </p>
            <div className="mt-3 flex gap-3">
              <Link
                to={`/polls/${poll._id}/vote`}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-800"
              >
                Vote
              </Link>
              <Link
                to={`/polls/${poll._id}/results`}
                className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-800"
              >
                Results
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
