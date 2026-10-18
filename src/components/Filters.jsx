export default function Filters({ filters, categories, onChange, onReset }) {
  return (
    <div className="filters">
      <div className="chips">
        <button
          className={!filters.category ? 'chip active' : 'chip'}
          onClick={() => onChange({ category: '' })}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            className={filters.category === c ? 'chip active' : 'chip'}
            onClick={() => onChange({ category: c })}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="filter-row">
        <input
          placeholder="City"
          value={filters.city}
          onChange={(e) => onChange({ city: e.target.value })}
        />
        <label>
          From <input type="date" value={filters.startDate} onChange={(e) => onChange({ startDate: e.target.value })} />
        </label>
        <label>
          To <input type="date" value={filters.endDate} onChange={(e) => onChange({ endDate: e.target.value })} />
        </label>
        <button onClick={onReset}>Reset</button>
      </div>
    </div>
  );
}