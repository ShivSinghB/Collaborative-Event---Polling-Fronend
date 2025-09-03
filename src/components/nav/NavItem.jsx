import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({ item, isActive, onClick, isMobile = false }) => {
  return (
    <Link
      to={item.path}
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-300
        ${isMobile ? 'w-full' : ''}
        ${isActive 
          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
          : 'text-gray-700 hover:bg-gray-100 hover:text-purple-600'
        }
      `}
    >
      <span className="text-xl">{item.icon}</span>
      <span className={`font-medium ${isMobile ? '' : 'hidden lg:inline'}`}>
        {item.label}
      </span>
    </Link>
  );
};

export default NavItem;