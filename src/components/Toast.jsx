import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearMessage } from '../features/registrations/registrationsSlice';
import '../styles/toast.css';

export default function Toast() {
  const message = useSelector((state) => state.registrations.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => dispatch(clearMessage()), 3000);
    return () => clearTimeout(t);
  }, [message, dispatch]);

  if (!message) return null;
  return <div className={`toast ${message.type}`}>{message.text}</div>;
}