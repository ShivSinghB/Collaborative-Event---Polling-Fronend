// src/services/eventService.js
import API from '../api';

const eventService = {
  createEvent: async (eventData) => {
    const response = await API.post('/events', eventData);
    return response.data.event;
  },

  getEvents: async () => {
    const response = await API.get('/events');
    return response.data.events;
  },

  getEvent: async (id) => {
    const response = await API.get(`/events/${id}`);
    return response.data.event;
  },

  updateEvent: async (id, data) => {
    const response = await API.put(`/events/${id}`, data);
    return response.data.event;
  },

  deleteEvent: async (id) => {
    const response = await API.delete(`/events/${id}`);
    return response.data;
  },

  inviteUsers: async (eventId, userIds) => {
    const response = await API.post(`/events/${eventId}/invite`, { userIds });
    return response.data.event;
  },

  respondToInvite: async (eventId, status) => {
    const response = await API.post(`/events/${eventId}/respond`, { status });
    return response.data.event;
  },

  searchUsers: async (query) => {
    const response = await API.get(`/users/search?q=${query}`);
    return response.data.users;
  }
};

export default eventService;