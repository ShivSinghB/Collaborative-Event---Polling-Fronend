import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import eventService from "../services/eventService";
import InviteUsers from "../components/events/InviteUsers";
import PollOptions from "../components/polls/PollOptions";
import PollResults from "../components/polls/PollResults";
import RespondToInvite from "../components/events/RespondToInvite";
import toast from "react-hot-toast";

const EventDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const data = await eventService.getEvent(id);
      setEvent(data);
    } catch (error) {
      toast.error("Failed to load event");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await eventService.deleteEvent(id);
        toast.success("Event deleted successfully");
        navigate("/dashboard");
      } catch (error) {
        toast.error("Failed to delete event");
      }
    }
  };

  const handleVote = () => {
    fetchEvent(); // Refresh event data after voting
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!event) return null;

  const isCreator = event.creator._id === user?._id;
  const currentParticipant = event.participants?.find(
    (p) => p.user._id === user?._id
  );
  const hasVoted = event.poll?.votes?.some((vote) => vote.user === user?._id);
  const canVote = currentParticipant?.status === "accepted" && !hasVoted;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {event.title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {event.description}
              </p>
            </div>
            {isCreator && (
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Delete Event
              </button>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900 capitalize">
                {event.status}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Created by</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {event.creator.name}
              </dd>
            </div>
          </dl>
        </div>

        {/* Participants Section */}
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">
            Participants
          </h4>
          <div className="space-y-3">
            {event.participants?.map((participant) => (
              <div
                key={participant.user._id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <img
                    src={
                      participant.user.avatar ||
                      `https://ui-avatars.com/api/?name=${participant.user.name}`
                    }
                    alt={participant.user.name}
                    className="h-8 w-8 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {participant.user.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {participant.user.email}
                    </p>
                  </div>
                </div>
                {participant.user._id === user?._id ? (
                  <RespondToInvite
                    eventId={event._id}
                    currentStatus={participant.status}
                    onRespond={fetchEvent}
                  />
                ) : (
                  <span
                    className={`text-sm ${
                      participant.status === "accepted"
                        ? "text-green-600"
                        : participant.status === "declined"
                        ? "text-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    {participant.status}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Poll Section */}
        {event.poll && (
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <h4 className="text-sm font-medium text-gray-900 mb-4">
              Date/Time Poll
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PollOptions
                poll={event.poll}
                onVote={handleVote}
                canVote={canVote}
              />
              <PollResults pollId={event.poll._id} />
            </div>
          </div>
        )}

        {/* Invite Users Section (only for creator) */}
        {isCreator && (
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <InviteUsers eventId={event._id} onInvite={fetchEvent} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetail;
