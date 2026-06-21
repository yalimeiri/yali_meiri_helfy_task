export default function TaskFilter({ filters, onFilterChange, sort, onSortChange }) {
  return (
    <div className="task-filter">
      <div className="filter-group">
        <button
          className={`filter-btn ${filters === 'all' ? 'active' : ''}`}
          onClick={() => onFilterChange('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filters === 'completed' ? 'active' : ''}`}
          onClick={() => onFilterChange('completed')}
        >
          Completed
        </button>
        <button
          className={`filter-btn ${filters === 'pending' ? 'active' : ''}`}
          onClick={() => onFilterChange('pending')}
        >
          Pending
        </button>
      </div>

      <div className="sort-group">
        <label>Sort by</label>
        <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
          <option value="default">default</option>
          <option value="priority">priority </option>
          <option value="date">date</option>
          <option value="title">lexicographical order</option>
        </select>
      </div>
    </div>
  );
}