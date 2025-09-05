// src/components/events/EventForm.jsx
import { useState } from 'react';
import toast from 'react-hot-toast';

const EventForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dateOptions: [{ date: '', time: '' }]
  });

  const handleAddDateOption = () => {
    setFormData({
      ...formData,
      dateOptions: [...formData.dateOptions, { date: '', time: '' }]
    });
  };

  const handleRemoveDateOption = (index) => {
    if (formData.dateOptions.length > 1) {
      const newOptions = formData.dateOptions.filter((_, i) => i !== index);
      setFormData({ ...formData, dateOptions: newOptions });
    }
  };

  const handleDateOptionChange = (index, field, value) => {
    const newOptions = [...formData.dateOptions];
    newOptions[index][field] = value;
    setFormData({ ...formData, dateOptions: newOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.dateOptions.some(opt => !opt.date || !opt.time)) {
      toast.error('Please fill all date and time options');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Event Title</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time Options</label>
        {formData.dateOptions.map((option, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="date"
              required
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={option.date}
              onChange={(e) => handleDateOptionChange(index, 'date', e.target.value)}
            />
            <input
              type="time"
              required
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={option.time}
              onChange={(e) => handleDateOptionChange(index, 'time', e.target.value)}
            />
            {formData.dateOptions.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveDateOption(index)}
                className="px-3 py-2 text-sm text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddDateOption}
          className="mt-2 text-sm text-indigo-600 hover:text-indigo-500"
        >
          + Add another date option
        </button>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Event
        </button>
      </div>
    </form>
  );
};

export default EventForm;