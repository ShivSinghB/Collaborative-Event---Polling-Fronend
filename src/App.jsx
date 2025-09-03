import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import EventDetail from "./pages/EventDetail";
import Navbar from "./components/nav/Navbar";
import Dashboard from "./pages/Dashbord";
import "./Style.css";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/event/:id" element={<EventDetail />} />
      </Routes>
    </>
  );
}
