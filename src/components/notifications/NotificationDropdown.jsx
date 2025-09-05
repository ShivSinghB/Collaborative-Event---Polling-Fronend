import { Link } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationContext';
import { formatDistanceToNow } from 'date-fns';

const NotificationDropdown = ({ onClose }) => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();

  const handleNotificationClick = async (notification) => {
    if (!notification.read) {
      await markAsRead(notification._id);
    }
    onClose();
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'event_invite':
        return '📨';
      case 'invite_accepted':
        return '✅';
      case 'invite_declined':
        return '❌';
      case 'event_updated':
        return '📝';
      case 'event_cancelled':
        return '🚫';
      default:
        return '📌';
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          {notifications.some(n => !n.read) && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              Mark all as read
            </button>
          )}
        </div>
      </div>

      <div className="overflow-y-auto max-h-80">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No notifications yet
          </div>
        ) : (
          notifications.map(notification => (
            <Link
              key={notification._id}
              to={notification.link || '#'}
              onClick={() => handleNotificationClick(notification)}
              className={`block p-4 hover:bg-gray-50 border-b border-gray-100 ${
                !notification.read ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start">
                <span className="text-2xl mr-3">
                  {getNotificationIcon(notification.type)}
                </span>
                <div className="flex-1">
                  <p className={`text-sm ${!notification.read ? 'font-semibold' : ''} text-gray-900`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                  </p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full ml-2"></div>
                )}
              </div>
            </Link>
          ))
        )}
      </div>

      {notifications.length > 0 && (
        <div className="p-3 border-t border-gray-200">
          <Link
            to="/notifications"
            onClick={onClose}
            className="text-sm text-center text-indigo-600 hover:text-indigo-800 block"
          >
            View all notifications
          </Link>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;