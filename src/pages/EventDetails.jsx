import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEventDetails, clearSelected } from '../features/events/eventsSlice';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/details.css';

function formatDate(date) {
  if (!date) return 'Date TBA';
  return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function EventDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selected, detailsStatus, detailsError } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getEventDetails(id));
    return () => {
      dispatch(clearSelected());
    };
  }, [dispatch, id]);

  const event = selected && selected.id === id ? selected : null;

  return (
    <div className="details-page">
      <Link to="/events" className="back-link">← Back to events</Link>

      {detailsStatus === 'loading' && <Loader />}
      {detailsStatus === 'failed' && (
        <ErrorMessage
          message={detailsError}
          onRetry={() => dispatch(getEventDetails(id))}
        />
      )}

      {event && (
        <div className="details-card">
          {event.image && <img src={event.image} alt={event.name} className="details-img" />}
          <div className="details-body">
            <span className="badge">
              {event.category}{event.genre ? ` · ${event.genre}` : ''}
            </span>
            <h1>{event.name}</h1>

            <p><strong>Date:</strong> {formatDate(event.date)}</p>
            {event.time && <p><strong>Time:</strong> {event.time.slice(0, 5)}</p>}
            <p><strong>Venue:</strong> {event.venue}</p>
            {event.address && <p><strong>Address:</strong> {event.address}</p>}
            <p>
              <strong>Location:</strong>{' '}
              {[event.city, event.country].filter(Boolean).join(', ') || 'TBA'}
            </p>
            {event.priceMin !== null && (
              <p>
                <strong>Price:</strong> {event.priceMin} – {event.priceMax} {event.currency}
              </p>
            )}
            {event.status && <p><strong>Status:</strong> {event.status}</p>}
            {event.info && <p>{event.info}</p>}
            {event.pleaseNote && <p><em>{event.pleaseNote}</em></p>}

            <div className="details-actions">
              {/* Register button is added in the next step */}
              {event.url && (
                <a href={event.url} target="_blank" rel="noreferrer">
                  View on Ticketmaster
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}