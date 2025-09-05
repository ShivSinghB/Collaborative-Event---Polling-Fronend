import { useState } from "react";
import API from "../api";

export default function InviteUsers({ eventId, onInvite }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.length < 2) return;
    setLoading(true);
    try {
      const { data } = await API.get(`/users/search?q=${query}`);
      setResults(data.users);
      setLoading(false);
    } catch (err) {
      console.error(err.response?.data);
      setLoading(false);
    }
  };

  const handleInvite = async (userId) => {
    try {
      await API.post(`/events/${eventId}/invite`, { userIds: [userId] });
      onInvite(); // refresh event data
      setResults(results.filter(u => u._id !== userId));
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Invite failed");
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search users by name/email"
          className="border px-3 py-1 rounded-lg w-full"
        />
        <button
          type="submit"
          className="px-4 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Search
        </button>
      </form>
      {loading && <p>Searching...</p>}
      <ul className="mt-2">
        {results.map(user => (
          <li key={user._id} className="flex justify-between items-center border-b py-1">
            <span>{user.name} ({user.email})</span>
            <button
              onClick={() => handleInvite(user._id)}
              className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Invite
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}


// import { useState } from "react";
// import API from "../api";

// export default function InviteUsers({ eventId, onUpdate }) {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [selected, setSelected] = useState([]);

//   const handleSearch = async (e) => {
//     const q = e.target.value;
//     setQuery(q);
//     if (q.length < 2) return setResults([]);
//     const { data } = await API.get(`/users/search?q=${q}`);
//     setResults(data.users);
//   };

//   const toggleSelect = (user) => {
//     setSelected((prev) =>
//       prev.find((u) => u._id === user._id)
//         ? prev.filter((u) => u._id !== user._id)
//         : [...prev, user]
//     );
//   };

//   const handleInvite = async () => {
//     if (!selected.length) return;
//     await API.post(`/events/${eventId}/invite`, {
//       userIds: selected.map((u) => u._id),
//     });
//     setQuery("");
//     setResults([]);
//     setSelected([]);
//     onUpdate(); // refresh event detail
//   };

//   return (
//     <div className="mt-6 bg-white p-4 rounded-xl shadow space-y-3">
//       <h3 className="font-semibold">Invite Users</h3>
//       <input
//         type="text"
//         value={query}
//         onChange={handleSearch}
//         placeholder="Search by name or email"
//         className="w-full p-2 border rounded"
//       />
//       {results.length > 0 && (
//         <ul className="max-h-40 overflow-y-auto border rounded p-2 space-y-1">
//           {results.map((user) => (
//             <li
//               key={user._id}
//               className={`p-2 rounded cursor-pointer ${
//                 selected.find((u) => u._id === user._id)
//                   ? "bg-purple-100"
//                   : "hover:bg-gray-100"
//               }`}
//               onClick={() => toggleSelect(user)}
//             >
//               {user.name} ({user.email})
//             </li>
//           ))}
//         </ul>
//       )}
//       {selected.length > 0 && (
//         <button
//           onClick={handleInvite}
//           className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
//         >
//           Invite Selected
//         </button>
//       )}
//     </div>
//   );
// }
