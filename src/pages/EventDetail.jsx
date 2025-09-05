// src/pages/EventDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import eventService from '../services/eventService';
import PollOptions from '../components/polls/PollOptions';
import PollResults from '../components/polls/PollResults';
import InviteUsers from '../components/events/InviteUsers';
import toast from 'react-hot-toast';

const EventDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPollResults, setShowPollResults] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const data = await eventService.getEvent(id);
      setEvent(data);
    } catch (error) {
      toast.error('Failed to load event');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventService.deleteEvent(id);
        toast.success('Event deleted successfully');
        navigate('/dashboard');
      } catch (error) {
        toast.error('Failed to delete event');
      }
    }
  };

  const handleRespond = async (status) => {
    try {
      await eventService.respondToInvite(id, status);
      toast.success(`Event ${status}`);
      fetchEvent();
    } catch (error) {
      toast.error('Failed to respond to invite');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!event) return null;

  const isCreator = event.creator._id === user.id;
  const participant = event.participants.find(p => p.user._id === user.id);
  const canVote = isCreator || participant?.status === 'accepted';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Event Details */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
            <p className="mt-2 text-gray-600">{event.description}</p>
            <p className="mt-4 text-sm text-gray-500">
              Created by {event.creator.name} on {new Date(event.createdAt).toLocaleDateString()}
            </p>
          </div>
          {isCreator && (
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-sm text-red-600 hover:text-red-800"
            >
              Delete Event
            </button>
          )}
        </div>

        {/* Invitation Response */}
        {participant && participant.status === 'pending' && (
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800 mb-3">You've been invited to this event</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleRespond('accepted')}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Accept
              </button>
              <button
                onClick={() => handleRespond('declined')}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Decline
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Participants */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Participants</h2>
        <div className="space-y-2">
          {event.participants.map((participant) => (
            <div key={participant.user._id} className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={participant.user.avatar}
                  alt={participant.user.name}
                  className="h-8 w-8 rounded-full mr-3"
                />
                <span className="text-sm font-medium text-gray-900">{participant.user.name}</span>
              </div>
              <span className={`text-sm ${
                participant.status === 'accepted' ? 'text-green-600' :
                participant.status === 'declined' ? 'text-red-600' :
                'text-yellow-600'
              }`}>
                {participant.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Poll Section */}
      {event.poll && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Poll: {event.poll.question}</h2>

          {/* Vote Options */}
          {canVote && !showPollResults && (
            <PollOptions poll={event.poll} eventId={event._id} onVote={fetchEvent} />
          )}

          {/* Show Poll Results */}
          {showPollResults && <PollResults poll={event.poll} />}

          {/* Toggle Results */}
          <button
            onClick={() => setShowPollResults(!showPollResults)}
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-800"
          >
            {showPollResults ? 'Hide Results' : 'View Results'}
          </button>
        </div>
      )}

      {/* Invite Users (only creator) */}
      {isCreator && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Invite Users</h2>
          <InviteUsers eventId={event._id} onInvite={fetchEvent} />
        </div>
      )}
    </div>
  );
};

export default EventDetail;
