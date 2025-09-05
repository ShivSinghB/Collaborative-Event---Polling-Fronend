import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

export default function PollResults() {
  const { pollId } = useParams();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/polls/${pollId}/results`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResults(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching poll results:", err);
        setLoading(false);
      }
    };
    fetchResults();
  }, [pollId]);

  if (loading) return <p className="p-6">Loading results...</p>;
  if (!results) return <p className="p-6">No results found.</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Poll Results</h2>
      <ul className="space-y-2">
        {results.options.map((opt, idx) => (
          <li
            key={idx}
            className="flex justify-between border p-2 rounded shadow-sm"
          >
            <span>{opt.option}</span>
            <span className="font-semibold">{opt.votes} votes</span>
          </li>
        ))}
      </ul>
    </div>
  );
}



// import { useEffect, useState } from "react";
// import API from "../../api";

// export default function PollResults({ pollId }) {
//   const [results, setResults] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchResults = async () => {
//     try {
//       setLoading(true);
//       const { data } = await API.get(`/polls/${pollId}/results`);
//       setResults(data.results);
//       setLoading(false);
//     } catch (err) {
//       console.error(err.response?.data);
//       setError("Failed to fetch poll results");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchResults();
//   }, [pollId]);

//   if (loading) return <p className="text-center mt-10">Loading poll results...</p>;
//   if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
//   if (!results) return null;

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-6">
//       <h2 className="text-2xl font-semibold mb-4">{results.question}</h2>
//       <p className="mb-4">Total votes: {results.totalVotes}</p>

//       <ul className="space-y-3">
//         {results.options.map(opt => (
//           <li key={opt.id} className="border p-3 rounded-lg">
//             <p className="font-medium">{opt.text} - {opt.voteCount} votes</p>
//             {!results.isAnonymous && opt.voters.length > 0 && (
//               <ul className="mt-2 ml-4 text-gray-700">
//                 {opt.voters.map(v => (
//                   <li key={v.name} className="flex items-center gap-2">
//                     <img src={v.avatar} alt={v.name} className="w-5 h-5 rounded-full" />
//                     <span>{v.name}</span>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>

//       <button
//         onClick={fetchResults}
//         className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
//       >
//         Refresh
//       </button>
//     </div>
//   );
// }
