import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function PollVote() {
  const { pollId } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/polls/${pollId}/results`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPoll(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching poll:", err);
        setLoading(false);
      }
    };
    fetchPoll();
  }, [pollId]);

  const handleVote = async () => {
    if (!selectedOption) return alert("Please select an option!");

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `/polls/${pollId}/vote`,
        { option: selectedOption },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/polls/${pollId}/results`);
    } catch (err) {
      console.error("Error voting:", err);
    }
  };

  if (loading) return <p className="p-6">Loading poll...</p>;
  if (!poll) return <p className="p-6">Poll not found.</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">{poll.question}</h2>
      <div className="space-y-3">
        {poll.options.map((opt, idx) => (
          <label key={idx} className="block">
            <input
              type="radio"
              name="poll"
              value={opt}
              checked={selectedOption === opt}
              onChange={() => setSelectedOption(opt)}
              className="mr-2"
            />
            {opt}
          </label>
        ))}
      </div>
      <button
        onClick={handleVote}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
      >
        Submit Vote
      </button>
    </div>
  );
}
