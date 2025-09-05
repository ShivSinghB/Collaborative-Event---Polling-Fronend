// src/components/events/EventCard.jsx
import { Link } from 'react-router-dom';

const EventCard = ({ event, isCreator }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{event.title}</h3>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
            {event.status}
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-600">{event.description}</p>
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            {isCreator ? 'Created by you' : `Created by ${event.creator?.name}`}
          </p>
          <p className="text-sm text-gray-500">
            {event.participants?.length || 0} participants
          </p>
        </div>
        <div className="mt-4">
          <Link
            to={`/events/${event._id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;