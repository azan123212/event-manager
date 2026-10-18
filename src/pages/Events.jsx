import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents } from '../features/events/eventsSlice';

export default function Events() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.events);

  useEffect(() => {
    const startDateTime = new Date().toISOString().split('.')[0] + 'Z';
    dispatch(getEvents({ startDateTime }));
  }, [dispatch]);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Events</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p style={{ color: 'crimson' }}>{error}</p>}
      {status === 'succeeded' && list.length === 0 && <p>No events found.</p>}
      <ul>
        {list.map((e) => (
          <li key={e.id}>
            {e.name} | {e.date} | {e.venue}, {e.city}
          </li>
        ))}
      </ul>
    </div>
  );
}