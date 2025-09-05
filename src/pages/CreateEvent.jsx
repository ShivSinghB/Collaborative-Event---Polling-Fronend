// src/pages/CreateEvent.jsx
import { useNavigate } from 'react-router-dom';
import EventForm from '../components/events/EventForm';
import eventService from '../services/eventService';
import toast from 'react-hot-toast';

const CreateEvent = () => {
  const navigate = useNavigate();

  const handleCreateEvent = async (formData) => {
    try {
      const event = await eventService.createEvent(formData);
      toast.success('Event created successfully!');
      navigate(`/events/${event._id}`);
    } catch (error) {
      toast.error('Failed to create event');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Event</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <EventForm onSubmit={handleCreateEvent} />
      </div>
    </div>
  );
};

export default CreateEvent;