import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cancelRegistration } from '../features/registrations/registrationsSlice';
import '../styles/myevents.css';

function todayString() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

function RegistrationCard({ reg, onCancel }) {
  return (
    <div className="reg-card">
      <Link to={`/events/${reg.eventId}`} className="reg-link">
        {reg.image ? (
          <img src={reg.image} alt={reg.name} />
        ) : (
          <div className="reg-noimg">No image</div>
        )}
        <div className="reg-body">
          <span className="badge">{reg.category}</span>
          <h3>{reg.name}</h3>
          <p>
            {reg.date || 'Date TBA'}
            {reg.time ? ` · ${reg.time.slice(0, 5)}` : ''}
          </p>
          <p>{reg.venue}{reg.city ? `, ${reg.city}` : ''}</p>
        </div>
      </Link>
      {onCancel && (
        <button className="cancel-btn" onClick={onCancel}>
          Cancel registration
        </button>
      )}
    </div>
  );
}

export default function MyEvents() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const items = useSelector((state) => state.registrations.items);

  const mine = items.filter((r) => r.userId === user.id);
  const today = todayString();

  const upcoming = mine
    .filter((r) => !r.date || r.date >= today)
    .sort((a, b) => (a.date || '9999').localeCompare(b.date || '9999'));
  const completed = mine
    .filter((r) => r.date && r.date < today)
    .sort((a, b) => b.date.localeCompare(a.date));

  const handleCancel = (reg) => {
    if (window.confirm(`Cancel your registration for "${reg.name}"?`)) {
      dispatch(cancelRegistration({ userId: user.id, eventId: reg.eventId }));
    }
  };

  if (mine.length === 0) {
    return (
      <div className="myevents-page">
        <h1>My Events</h1>
        <p className="empty">You haven't registered for any events yet.</p>
        <Link to="/events">Browse events</Link>
      </div>
    );
  }

  return (
    <div className="myevents-page">
      <h1>My Events</h1>

      <h2>Upcoming ({upcoming.length})</h2>
      {upcoming.length === 0 ? (
        <p className="empty">No upcoming events.</p>
      ) : (
        <div className="reg-grid">
          {upcoming.map((r) => (
            <RegistrationCard key={r.eventId} reg={r} onCancel={() => handleCancel(r)} />
          ))}
        </div>
      )}

      <h2>Completed ({completed.length})</h2>
      {completed.length === 0 ? (
        <p className="empty">No completed events.</p>
      ) : (
        <div className="reg-grid completed">
          {completed.map((r) => (
            <RegistrationCard key={r.eventId} reg={r} />
          ))}
        </div>
      )}
    </div>
  );
}