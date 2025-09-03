import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaTimes } from 'react-icons/fa';
import NavItem from './NavItem';

const MobileNav = ({ isOpen, setIsOpen, navItems, activeItem, setActiveItem }) => {
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    const overlay = overlayRef.current;
    const items = itemsRef.current;

    if (isOpen) {
      gsap.fromTo(sidebar, 
        { x: '-100%' },
        { x: '0%', duration: 0.3, ease: 'power2.out' }
      );
      
      // Animate overlay
      gsap.fromTo(overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      
      // Animate menu items
      gsap.fromTo(items,
        { x: -50, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.3, 
          stagger: 0.05,
          delay: 0.1,
          ease: 'power2.out'
        }
      );
    } else {
      gsap.to(sidebar, { x: '-100%', duration: 0.3, ease: 'power2.in' });
      gsap.to(overlay, { opacity: 0, duration: 0.3 });
    }
  }, [isOpen]);

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden ${isOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsOpen(false)}
      />
      
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 lg:hidden transform -translate-x-full"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              EventPoll Pro
            </h2>
            <p className="text-xs text-gray-500 mt-1">Collaborative Platform</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FaTimes className="text-gray-600" />
          </button>
        </div>
        
        {/* Navigation Items */}
        <nav className="p-4 space-y-2">
          {navItems.map((item, index) => (
            <div
              key={item.id}
              ref={el => itemsRef.current[index] = el}
            >
              <NavItem
                item={item}
                isActive={activeItem === item.id}
                onClick={() => handleItemClick(item)}
                isMobile={true}
              />
            </div>
          ))}
        </nav>
        
        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            © 2024 EventPoll Pro
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNav;