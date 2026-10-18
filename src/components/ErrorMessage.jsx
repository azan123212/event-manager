export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="status-msg error">
      <p>{message}</p>
      {onRetry && <button onClick={onRetry}>Try again</button>}
    </div>
  );
}