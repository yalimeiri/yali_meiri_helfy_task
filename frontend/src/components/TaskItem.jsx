export default function TaskItem({ task, onDelete, onToggle, onEdit }) {

  const priorityColors = {
    High:   'red',
    Medium: 'orange',
    Low:    'green',
  };

  return (
    <div
      className={`task-item ${task.completed ? 'completed' : ''}`}
      style={{ borderLeftColor: task.completed ? undefined : priorityColors[task.priority] }}
    >
      <div className="task-content">
        <div className="task-header">
          <h3 className={task.completed ? 'title-completed' : ''}>
            {task.title}
          </h3>
          <span
            className="priority-badge"
            style={{color: priorityColors[task.priority] }}
          >
            {task.priority}
          </span>
        </div>

        {task.description && <p className="task-description">{task.description}</p>}

        <small className="task-date">
          Created: {new Date(task.createdAt).toLocaleString()}
        </small>
      </div>

      <div className="task-actions">
        <button
          className={`toggle-btn ${task.completed ? 'completed' : ''}`}
          onClick={() => onToggle(task.id)}
        >
          {task.completed ? 'Completed' : 'Pending'}
        </button>

        <button className="edit-btn" onClick={() => onEdit(task)}>
           Edit
        </button>

        <button className="delete-btn" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}