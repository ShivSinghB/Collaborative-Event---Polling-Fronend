// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import eventService from '../services/eventService';
import EventCard from '../components/events/EventCard';

const Dashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState({ created: [], invited: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await eventService.getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Notifications */}
      {user?.notifications?.filter(n => !n.read).length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                You have {user.notifications.filter(n => !n.read).length} new notifications
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Created Events */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">My Events</h2>
        {events.created.length === 0 ? (
          <p className="text-gray-500">You haven't created any events yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.created.map(event => (
              <EventCard key={event._id} event={event} isCreator={true} />
            ))}
          </div>
        )}
      </div>

      {/* Invited Events */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Invited Events</h2>
        {events.invited.length === 0 ? (
          <p className="text-gray-500">You haven't been invited to any events yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.invited.map(event => (
              <EventCard key={event._id} event={event} isCreator={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;