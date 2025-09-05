import { Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
// import Layout from './components/layout/Layout';
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import EventDetail from "./pages/EventDetail";
import Register from "./pages/Register";
import { NotificationProvider } from "./context/NotificationContext";
import Layout from "./components/Layout";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <>
      <AuthProvider>
        {/* <NotificationProvider> */}
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/events/create" element={<CreateEvent />} />
                <Route path="/events/:id" element={<EventDetail />} />
                {/* <Route path="/notifications" element={<Notifications />} /> */}
              </Route>
            </Route>
          </Routes>
        {/* </NotificationProvider> */}
      </AuthProvider>
    </>
  );
}

export default App;
