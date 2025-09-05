import API from "../api";

export default function RespondToInvite({ eventId, onRespond }) {
  const handleResponse = async (status) => {
    try {
      await API.post(`/events/${eventId}/respond`, { status });
      onRespond(); // refresh event data
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Action failed");
    }
  };

  return (
    <div className="flex gap-2 mt-3">
      <button
        onClick={() => handleResponse("accepted")}
        className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Accept
      </button>
      <button
        onClick={() => handleResponse("declined")}
        className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Decline
      </button>
    </div>
  );
}


// import API from "../api";

// export default function RespondInvite({ event, onUpdate }) {
//   const handleResponse = async (status) => {
//     await API.post(`/events/${event._id}/respond`, { status });
//     onUpdate(); // refresh event detail / dashboard
//   };

//   const participant = event.participants.find(
//     (p) => p.user._id === JSON.parse(localStorage.getItem("userId"))
//   );
//   if (!participant || participant.status !== "pending") return null;

//   return (
//     <div className="mt-4 space-x-2">
//       <button
//         onClick={() => handleResponse("accepted")}
//         className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//       >
//         Accept
//       </button>
//       <button
//         onClick={() => handleResponse("declined")}
//         className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//       >
//         Decline
//       </button>
//     </div>
//   );
// }
