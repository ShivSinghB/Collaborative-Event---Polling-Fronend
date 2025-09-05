// src/components/events/InviteUsers.jsx
import { useState, useEffect } from 'react';
import eventService from '../../services/eventService';
import toast from 'react-hot-toast';

const InviteUsers = ({ eventId, onInvite }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.length >= 2) {
      searchUsers();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const searchUsers = async () => {
    try {
      const users = await eventService.searchUsers(searchQuery);
      setSearchResults(users);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  const toggleUserSelection = (user) => {
    setSelectedUsers(prev => {
      const exists = prev.find(u => u._id === user._id);
      if (exists) {
        return prev.filter(u => u._id !== user._id);
      }
      return [...prev, user];
    });
  };

  const handleInvite = async () => {
    if (selectedUsers.length === 0) {
      toast.error('Please select at least one user');
      return;
    }

    setLoading(true);
    try {
      const userIds = selectedUsers.map(u => u._id);
      await eventService.inviteUsers(eventId, userIds);
      toast.success('Users invited successfully');
      setSelectedUsers([]);
      setSearchQuery('');
      onInvite();
    } catch (error) {
      toast.error('Failed to invite users');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Invite Users</h3>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users by name or email..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {searchResults.length > 0 && (
        <div className="mb-4 max-h-48 overflow-y-auto border border-gray-200 rounded-md">
          {searchResults.map(user => (
            <div
              key={user._id}
              className={`p-3 cursor-pointer hover:bg-gray-50 ${
                selectedUsers.find(u => u._id === user._id) ? 'bg-indigo-50' : ''
              }`}
              onClick={() => toggleUserSelection(user)}
            >
              <div className="flex items-center">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-8 w-8 rounded-full mr-3"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedUsers.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Selected users:</p>
          <div className="flex flex-wrap gap-2">
            {selectedUsers.map(user => (
              <span
                key={user._id}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
              >
                {user.name}
                <button
                  onClick={() => toggleUserSelection(user)}
                  className="ml-2 text-indigo-600 hover:text-indigo-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleInvite}
        disabled={loading || selectedUsers.length === 0}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? 'Inviting...' : 'Send Invitations'}
      </button>
    </div>
  );
};

export default InviteUsers;