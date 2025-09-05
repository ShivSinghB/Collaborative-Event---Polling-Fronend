import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">Event & Polls</h1>
      <div className="space-x-4">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/events" className="hover:underline">Events</Link>
        <Link to="/polls" className="hover:underline">Polls</Link>

        {isAuth ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}



// import React, { useState, useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { 
//   FaBars, 
//   FaPoll, 
//   FaCalendarAlt, 
//   FaUserCircle,
//   FaSignInAlt,
//   FaUserPlus
// } from 'react-icons/fa';
// import { MdDashboard, MdEventAvailable } from 'react-icons/md';
// import NavItem from './NavItem';
// import Mobile from './MobileNav';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [activeItem, setActiveItem] = useState('dashboard');
//   const [scrolled, setScrolled] = useState(false);
//   const navRef = useRef(null);
//   const logoRef = useRef(null);
//   const itemsRef = useRef([]);

//   const navItems = [
//     { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: <MdDashboard /> },
//     { id: 'polls', label: 'Poll Interaction', path: '/polls', icon: <FaPoll /> },
//     { id: 'my-events', label: 'My Events', path: '/my-events', icon: <FaCalendarAlt /> },
//     { id: 'invited', label: 'Invited Events', path: '/invited', icon: <MdEventAvailable /> },
//     // { id: 'profile', label: 'Profile', path: '/profile', icon: <FaUserCircle /> },
//     { id: 'login', label: 'Login', path: '/login', icon: <FaSignInAlt /> },
//     { id: 'signup', label: 'Sign Up', path: '/signup', icon: <FaUserPlus /> },
//   ];

//   useEffect(() => {
//     // Initial animation
//     const tl = gsap.timeline();
    
//     tl.fromTo(logoRef.current,
//       { opacity: 0, x: -30 },
//       { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
//     );
    
//     tl.fromTo(itemsRef.current,
//       { opacity: 0, y: -20 },
//       { 
//         opacity: 1, 
//         y: 0, 
//         duration: 0.4, 
//         stagger: 0.1,
//         ease: 'power2.out'
//       },
//       '-=0.3'
//     );

//     // Scroll effect
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     if (scrolled) {
//       gsap.to(navRef.current, {
//         backgroundColor: 'rgba(255, 255, 255, 0.95)',
//         backdropFilter: 'blur(10px)',
//         boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
//         duration: 0.3
//       });
//     } else {
//       gsap.to(navRef.current, {
//         backgroundColor: 'rgba(255, 255, 255, 1)',
//         boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
//         duration: 0.3
//       });
//     }
//   }, [scrolled]);

//   return (
//     <>
//       <nav 
//         ref={navRef}
//         className="fixed top-0 left-0 right-0 z-30 bg-white shadow-sm transition-all duration-300"
//       >
//         <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Logo and Hamburger */}
//             <div className="flex items-center gap-4">
//               {/* Hamburger Menu */}
//               <button
//                 onClick={() => setIsOpen(true)}
//                 className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
//               >
//                 <FaBars className="text-gray-700 text-xl" />
//               </button>
              
//               {/* Logo */}
//               <div ref={logoRef} className="flex items-center">
//                 <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
//                   EventPoll Pro
//                 </h1>
//               </div>
//             </div>

//             {/* Navigation Items */}
//             <div className="hidden lg:flex items-center space-x-1">
//               {navItems.map((item, index) => (
//                 <div
//                   key={item.id}
//                   ref={el => itemsRef.current[index] = el}
//                 >
//                   <NavItem
//                     item={item}
//                     isActive={activeItem === item.id}
//                     onClick={() => setActiveItem(item.id)}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Sidebar */}
//       <Mobile
//         isOpen={isOpen}
//         setIsOpen={setIsOpen}
//         navItems={navItems}
//         activeItem={activeItem}
//         setActiveItem={setActiveItem}
//       />
//     </>
//   );
// };

// export default Navbar;

// // import React from 'react'
// // import { Link } from 'react-router-dom'

// // const Navbar = () => {
// //   return (
// //     <div>
     
// //        <nav>
// //       <Link to="/dashboard">Dashboard</Link>
// //       <Link to="/login">Login</Link> 
// //       <Link to="/signup">Signup</Link>
// //     </nav>
// //     </div>
// //   )
// // }

// // export default Navbar