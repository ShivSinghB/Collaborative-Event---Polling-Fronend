import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pollQuestion, setPollQuestion] = useState("Choose your preferred date and time");
  const [dateOptions, setDateOptions] = useState([{ date: "", time: "" }]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAddOption = () => {
    setDateOptions([...dateOptions, { date: "", time: "" }]);
  };

  const handleChangeOption = (index, field, value) => {
    const updated = [...dateOptions];
    updated[index][field] = value;
    setDateOptions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/events",
        { title, description, pollQuestion, dateOptions },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate("/dashboard"); // after create go dashboard
    } catch (err) {
      console.error("Error creating event:", err);
      alert("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Poll Question */}
        <div>
          <label className="block font-medium">Poll Question</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={pollQuestion}
            onChange={(e) => setPollQuestion(e.target.value)}
          />
        </div>

        {/* Date Options */}
        <div>
          <label className="block font-medium">Date Options</label>
          {dateOptions.map((opt, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="date"
                className="border rounded px-2 py-1"
                value={opt.date}
                onChange={(e) =>
                  handleChangeOption(index, "date", e.target.value)
                }
                required
              />
              <input
                type="time"
                className="border rounded px-2 py-1"
                value={opt.time}
                onChange={(e) =>
                  handleChangeOption(index, "time", e.target.value)
                }
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddOption}
            className="mt-2 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
          >
            + Add Option
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-800"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
}
