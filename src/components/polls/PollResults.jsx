// src/components/polls/PollResults.jsx
import { useEffect, useState } from 'react';
import pollService from '../../services/pollService';

const PollResults = ({ pollId }) => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
    const interval = setInterval(fetchResults, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [pollId]);

  const fetchResults = async () => {
    try {
      const data = await pollService.getPollResults(pollId);
      setResults(data);
    } catch (error) {
      console.error('Error fetching results:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>;
  }

  if (!results) return null;

  const maxVotes = Math.max(...results.options.map(opt => opt.voteCount), 1);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Poll Results</h3>
      <p className="text-sm text-gray-600 mb-4">Total votes: {results.totalVotes}</p>
      
      <div className="space-y-4">
        {results.options.map((option) => {
          const percentage = (option.voteCount / maxVotes) * 100;
          
          return (
            <div key={option.id}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-900">{option.text}</span>
                <span className="text-sm text-gray-600">{option.voteCount} votes</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              {option.voters && option.voters.length > 0 && (
                <div className="mt-2 flex -space-x-2">
                  {option.voters.slice(0, 5).map((voter, index) => (
                    <img
                      key={index}
                      src={voter.avatar}
                      alt={voter.name}
                      title={voter.name}
                      className="h-6 w-6 rounded-full border-2 border-white"
                    />
                  ))}
                  {option.voters.length > 5 && (
                    <span className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-300 text-xs font-medium text-gray-600 border-2 border-white">
                      +{option.voters.length - 5}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PollResults;