import { useState } from 'react';
import eventService from '../../services/eventService';
import toast from 'react-hot-toast';

const RespondToInvite = ({ eventId, currentStatus, onRespond }) => {
  const [loading, setLoading] = useState(false);

  const handleRespond = async (status) => {
    setLoading(true);
    try {
      await eventService.respondToInvite(eventId, status);
      toast.success(`Invitation ${status}`);
      onRespond();
    } catch (error) {
      toast.error('Failed to respond to invitation');
    } finally {
      setLoading(false);
    }
  };

  if (currentStatus && currentStatus !== 'pending') {
    return (
      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
        {currentStatus === 'accepted' ? '✓ Accepted' : '✗ Declined'}
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleRespond('accepted')}
        disabled={loading}
        className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md disabled:opacity-50"
      >
        Accept
      </button>
      <button
        onClick={() => handleRespond('declined')}
        disabled={loading}
        className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md disabled:opacity-50"
      >
        Decline
      </button>
    </div>
  );
};

export default RespondToInvite;