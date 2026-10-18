import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEvents,
  getCategories,
  setFilters,
  setPage,
} from '../features/events/eventsSlice';
import EventCard from '../components/EventCard';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import '../styles/events.css';

const emptyFilters = { keyword: '', category: '', city: '', startDate: '', endDate: '' };

function buildParams(filters, page) {
  const startDateTime = filters.startDate
    ? `${filters.startDate}T00:00:00Z`
    : new Date().toISOString().split('.')[0] + 'Z';
  return {
    keyword: filters.keyword,
    classificationName: filters.category,
    city: filters.city,
    startDateTime,
    endDateTime: filters.endDate ? `${filters.endDate}T23:59:59Z` : '',
    page,
  };
}

export default function Events() {
  const dispatch = useDispatch();
  const { list, status, error, categories, filters, page, totalPages, totalElements } =
    useSelector((state) => state.events);

  const [keyword, setKeyword] = useState(filters.keyword);
  const [city, setCity] = useState(filters.city);

  useEffect(() => {
    if (categories.length === 0) dispatch(getCategories());
  }, [dispatch, categories.length]);

  useEffect(() => {
    dispatch(getEvents(buildParams(filters, page)));
  }, [dispatch, filters, page]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (keyword !== filters.keyword || city !== filters.city) {
        dispatch(setFilters({ keyword, city }));
      }
    }, 500);
    return () => clearTimeout(t);
  }, [keyword, city, filters.keyword, filters.city, dispatch]);

  const handleFilterChange = (changes) => {
    if ('city' in changes) {
      setCity(changes.city);
      return;
    }
    dispatch(setFilters(changes));
  };

  const handleReset = () => {
    setKeyword('');
    setCity('');
    dispatch(setFilters(emptyFilters));
  };

  return (
    <div className="events-page">
      <h1>Upcoming Events</h1>
      <input
        className="search-input"
        type="search"
        placeholder="Search events, artists, teams..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Filters
        filters={{ ...filters, city }}
        categories={categories}
        onChange={handleFilterChange}
        onReset={handleReset}
      />

      {status === 'loading' && <Loader />}
      {status === 'failed' && (
        <ErrorMessage
          message={error}
          onRetry={() => dispatch(getEvents(buildParams(filters, page)))}
        />
      )}
      {status === 'succeeded' && list.length === 0 && (
        <p className="status-msg">No events found. Try different filters.</p>
      )}
      {status === 'succeeded' && list.length > 0 && (
        <p className="count">{totalElements.toLocaleString()} events found</p>
      )}

      <div className="event-grid">
        {list.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={(p) => {
          dispatch(setPage(p));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}