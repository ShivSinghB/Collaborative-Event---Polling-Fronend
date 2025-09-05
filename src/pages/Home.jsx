import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 to-blue-100">
      <h1 className="text-5xl font-bold text-purple-700 mb-6">Welcome to EventPoll Pro</h1>
      <p className="text-lg text-gray-700 max-w-xl text-center mb-8">
        Create polls, schedule events, and collaborate easily with your friends or colleagues. 
        Join EventPoll Pro and never miss an event!
      </p>
      <div className="flex gap-4">
        <Link
          to="/signup"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Signup
        </Link>
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
