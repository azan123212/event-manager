const MAX_PAGES = 50;

export default function Pagination({ page, totalPages, onChange }) {
  const pages = Math.min(totalPages, MAX_PAGES);
  if (pages <= 1) return null;

  return (
    <div className="pagination">
      <button disabled={page === 0} onClick={() => onChange(page - 1)}>
        Previous
      </button>
      <span>Page {page + 1} of {pages}</span>
      <button disabled={page >= pages - 1} onClick={() => onChange(page + 1)}>
        Next
      </button>
    </div>
  );
}