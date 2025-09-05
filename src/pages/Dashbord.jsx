import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const fetchData = async () => {
      try {
        // get user info
        const userRes = await axios.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userRes.data);

        // get events
        const eventsRes = await axios.get("/events", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(eventsRes.data);

        setLoading(false);
      } catch (err) {
        console.error("Error loading dashboard:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="p-6">Loading dashboard...</p>;

  return (
    <div className="p-6">
      {/* User Info */}
      {user && (
        <div className="bg-white shadow rounded p-4 mb-6">
          <h2 className="text-xl font-bold">Welcome, {user.name} 👋</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      )}

      {/* Events Overview */}
      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-semibold mb-3">Your Events</h3>
        {events.length === 0 ? (
          <p className="text-gray-500">No events created yet.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-2">
            {events.map((event) => (
              <li key={event._id}>
                <span className="font-medium">{event.title}</span> –{" "}
                {event.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}





// // import { useEffect, useState } from "react";
// // import API from "../api";
// // import { Link } from "react-router-dom";

// // export default function Dashboard() {
// //   const [myEvents, setMyEvents] = useState([]);
// //   const [invitedEvents, setInvitedEvents] = useState([]);

// //   const fetchEvents = async () => {
// //     try {
// //       const { data } = await API.get("/events");
// //       // backend se created + invited dono aayenge
// //       setMyEvents(data.events.created || []);
// //       setInvitedEvents(data.events.invited || []);
// //     } catch (err) {
// //       console.error("Error fetching events:", err.response?.data || err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchEvents();
// //   }, []);

// //   return (
// //     <div className="p-6 mt-16 max-w-5xl mx-auto">
// //       <div className="flex justify-between items-center mb-8">
// //         <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
// //         <Link
// //           to="/create-event"
// //           className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
// //         >
// //           + Create Event
// //         </Link>
// //       </div>

// //       {/* My Events */}
// //       <section className="mb-10">
// //         <h2 className="text-xl font-semibold mb-4">My Events</h2>
// //         {myEvents.length === 0 ? (
// //           <p className="text-gray-500">No events created yet.</p>
// //         ) : (
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             {myEvents.map((event) => (
// //               <Link
// //                 key={event._id}
// //                 to={`/event/${event._id}`}
// //                 className="p-4 bg-white rounded-xl shadow hover:shadow-lg border transition"
// //               >
// //                 <h3 className="text-lg font-bold text-purple-700">
// //                   {event.title}
// //                 </h3>
// //                 <p className="text-gray-600 text-sm line-clamp-2">
// //                   {event.description}
// //                 </p>
// //               </Link>
// //             ))}
// //           </div>
// //         )}
// //       </section>

// //       {/* Invited Events */}
// //       <section>
// //         <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
// //           Invited Events
// //           {invitedEvents.length > 0 && (
// //             <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
// //               {invitedEvents.length} New
// //             </span>
// //           )}
// //         </h2>
// //         {invitedEvents.length === 0 ? (
// //           <p className="text-gray-500">No invites yet.</p>
// //         ) : (
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             {invitedEvents.map((event) => (
// //               <Link
// //                 key={event._id}
// //                 to={`/event/${event._id}`}
// //                 className="p-4 bg-white rounded-xl shadow hover:shadow-lg border transition"
// //               >
// //                 <h3 className="text-lg font-bold text-blue-700">
// //                   {event.title}
// //                 </h3>
// //                 <p className="text-gray-600 text-sm line-clamp-2">
// //                   {event.description}
// //                 </p>
// //                 <span className="inline-block mt-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
// //                   Invited
// //                 </span>
// //               </Link>
// //             ))}
// //           </div>
// //         )}
// //       </section>
// //     </div>
// //   );
// // }





// import { useEffect, useState } from "react";
// import API from "../api";
// import { Link } from "react-router-dom";

// export default function Dashboard() {
//   const [events, setEvents] = useState({ created: [], invited: [] });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchEvents = async () => {
//     try {
//       setLoading(true);
//       const { data } = await API.get("/events");
//       setEvents(data.events);
//       setLoading(false);
//     } catch (err) {
//       console.error(err.response?.data);
//       setError("Failed to load events");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

//       {/* Created Events */}
//       <section className="mb-10">
//         <h2 className="text-2xl font-semibold mb-3">Your Events</h2>
//         {events.created.length === 0 && <p>No events created yet.</p>}
//         <div className="grid md:grid-cols-2 gap-4">
//           {events.created.map((event) => (
//             <Link
//               to={`/event/${event._id}`}
//               key={event._id}
//               className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
//             >
//               <h3 className="font-bold text-lg">{event.title}</h3>
//               <p className="text-gray-600 text-sm">{event.description}</p>
//               <p className="mt-2 text-sm text-gray-500">
//                 Status: {event.status}
//               </p>
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* Invited Events */}
//       <section>
//         <h2 className="text-2xl font-semibold mb-3">Invited Events</h2>
//         {events.invited.length === 0 && <p>No invitations yet.</p>}
//         <div className="grid md:grid-cols-2 gap-4">
//           {events.invited.map((event) => (
//             <Link
//               to={`/event/${event._id}`}
//               key={event._id}
//               className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition"
//             >
//               <h3 className="font-bold text-lg">{event.title}</h3>
//               <p className="text-gray-600 text-sm">{event.description}</p>
//               <p className="mt-2 text-sm text-gray-500">
//                 Status:{" "}
//                 {
//                   event.participants.find(
//                     (p) => p.user._id === localStorage.getItem("userId")
//                   )?.status
//                 }
//               </p>
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* Notifications */}
//       <section className="mb-10">
//         <h2 className="text-2xl font-semibold mb-3">Notifications</h2>
//         {events.invited.length === 0 && <p>No invitations yet.</p>}
//         <div className="space-y-2">
//           {events.invited.map((event) => {
//             const participant = event.participants.find(
//               (p) => p.user._id === localStorage.getItem("userId")
//             );
//             if (!participant || participant.status !== "pending") return null;
//             return (
//               <div
//                 key={event._id}
//                 className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded"
//               >
//                 <p>
//                   You are invited to <strong>{event.title}</strong>
//                 </p>
//                 <RespondToInvite
//                   eventId={event._id}
//                   onRespond={() => fetchEvents()}
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </section>
//     </div>
//   );
// }
