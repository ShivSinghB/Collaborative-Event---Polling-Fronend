// src/services/pollService.js
import API from '../api';

const pollService = {
  vote: async (pollId, optionId) => {
    const response = await API.post(`/polls/${pollId}/vote`, { optionId });
    return response.data.poll;
  },

  getPollResults: async (pollId) => {
    const response = await API.get(`/polls/${pollId}/results`);
    return response.data.results;
  }
};

export default pollService;