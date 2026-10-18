const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';
const API_KEY = import.meta.env.VITE_TM_API_KEY;

async function request(path, params = {}) {
  const query = new URLSearchParams({ apikey: API_KEY });
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, value);
    }
  });

  const res = await fetch(`${BASE_URL}${path}?${query.toString()}`);
  if (res.status === 429) {
    throw new Error('Too many requests. Please wait a moment and try again.');
  }
  if (res.status === 401) {
    throw new Error('Invalid API key. Check VITE_TM_API_KEY in your .env file.');
  }
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }
  return res.json();
}

export function normalizeEvent(e) {
  const venue = e._embedded?.venues?.[0];
  const classification = e.classifications?.[0];
  const images = e.images || [];
  const largest = [...images].sort((a, b) => (b.width || 0) - (a.width || 0))[0];
  const price = e.priceRanges?.[0];

  return {
    id: e.id,
    name: e.name,
    image: largest?.url || null,
    date: e.dates?.start?.localDate || null,
    time: e.dates?.start?.localTime || null,
    venue: venue?.name || 'Venue TBA',
    city: venue?.city?.name || '',
    country: venue?.country?.name || '',
    address: venue?.address?.line1 || '',
    category: classification?.segment?.name || 'Other',
    genre: classification?.genre?.name || '',
    priceMin: price?.min ?? null,
    priceMax: price?.max ?? null,
    currency: price?.currency || '',
    info: e.info || '',
    pleaseNote: e.pleaseNote || '',
    url: e.url || '',
    status: e.dates?.status?.code || '',
  };
}

export const fetchEvents = (params) =>
  request('/events.json', { sort: 'date,asc', size: 20, ...params });

export const fetchEventById = (id) => request(`/events/${id}.json`);

export const fetchClassifications = () => request('/classifications.json', { size: 50 });