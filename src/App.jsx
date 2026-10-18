import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import MyEvents from './pages/MyEvents';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/events" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
