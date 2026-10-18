import { Link } from 'react-router-dom';

export default function EventCard({ event }) {
  return (
    <Link to={`/events/${event.id}`} className="event-card">
      {event.image ? (
        <img src={event.image} alt={event.name} loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
      ) : (
        <div className="event-card-noimg">No image</div>
      )}
      <div className="event-card-body">
        <span className="badge">{event.category}</span>
        <h3>{event.name}</h3>
        <p>{event.date || 'Date TBA'}{event.time ? ` · ${event.time.slice(0, 5)}` : ''}</p>
        <p>{event.venue}{event.city ? `, ${event.city}` : ''}</p>
      </div>
    </Link>
  );
}