import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import EventDetail from "./pages/EventDetail";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashbord";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/event/:id" element={<EventDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
