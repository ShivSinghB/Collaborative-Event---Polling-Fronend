// src/components/polls/PollOptions.jsx
import { useState } from 'react';
import pollService from '../../services/pollService';
import toast from 'react-hot-toast';

const PollOptions = ({ poll, onVote, canVote }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVote = async () => {
    if (!selectedOption) {
      toast.error('Please select an option');
      return;
    }

    setLoading(true);
    try {
      await pollService.vote(poll._id, selectedOption);
      toast.success('Vote submitted successfully');
      onVote();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit vote');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{poll.question}</h3>
      
      <div className="space-y-3">
        {poll.options.map((option) => (
          <label
            key={option.id}
            className={`flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
              selectedOption === option.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="poll-option"
              value={option.id}
              checked={selectedOption === option.id}
              onChange={() => setSelectedOption(option.id)}
              disabled={!canVote || poll.status === 'closed'}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-3 text-sm font-medium text-gray-900">
              {option.text}
            </span>
          </label>
        ))}
      </div>

      {canVote && poll.status === 'open' && (
        <button
          onClick={handleVote}
          disabled={loading || !selectedOption}
          className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Vote'}
        </button>
      )}

      {poll.status === 'closed' && (
        <p className="mt-4 text-sm text-gray-500 text-center">This poll is closed</p>
      )}
    </div>
  );
};

export default PollOptions;