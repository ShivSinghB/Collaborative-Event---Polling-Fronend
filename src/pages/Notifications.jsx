import { useNotifications } from '../context/NotificationContext';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const Notifications = () => {
  const { notifications, markAsRead } = useNotifications();

  const handleNotificationClick = async (notification) => {
    if (!notification.read) {
      await markAsRead(notification._id);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'event_invite':
        return { icon: '📨', color: 'bg-blue-100 text-blue-600' };
      case 'invite_accepted':
        return { icon: '✅', color: 'bg-green-100 text-green-600' };
      case 'invite_declined':
        return { icon: '❌', color: 'bg-red-100 text-red-600' };
      case 'event_updated':
        return { icon: '📝', color: 'bg-yellow-100 text-yellow-600' };
      case 'event_cancelled':
        return { icon: '🚫', color: 'bg-gray-100 text-gray-600' };
      default:
        return { icon: '📌', color: 'bg-indigo-100 text-indigo-600' };
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Notifications</h1>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">No notifications yet</p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {notifications.map(notification => {
              const { icon, color } = getNotificationIcon(notification.type);
              
              return (
                <li key={notification._id}>
                  <Link
                    to={notification.link || '#'}
                    onClick={() => handleNotificationClick(notification)}
                    className={`block hover:bg-gray-50 px-4 py-4 sm:px-6 ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 h-10 w-10 rounded-full ${color} flex items-center justify-center`}>
                        <span className="text-xl">{icon}</span>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <p className={`text-sm ${!notification.read ? 'font-semibold' : ''} text-gray-900`}>
                            {notification.message}
                          </p>
                          {!notification.read && (
                            <div className="ml-2 flex-shrink-0">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                New
                              </span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">
                          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notifications;