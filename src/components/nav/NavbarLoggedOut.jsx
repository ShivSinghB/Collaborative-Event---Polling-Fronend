import { Link } from "react-router-dom";

export default function NavbarLoggedOut() {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-bold text-purple-600">
            EventPoll Pro
          </Link>
          <div className="space-x-4">
            <Link
              to="/login"
              className="px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
