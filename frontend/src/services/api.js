const BASE_URL = 'http://localhost:4000/api/tasks';

export async function fetchTasks() {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return response.json();
}

export async function createTask(title, description, priority) {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, priority }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create task');
  }
  return response.json();
}

export async function updateTask(id, updates) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error('Failed to update task');
  return response.json();
}

export async function deleteTask(id) {
  const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete task');
}

export async function toggleTask(id) {
  const response = await fetch(`${BASE_URL}/${id}/toggle`, {
    method: 'PATCH',
  });
  if (!response.ok) throw new Error('Failed to toggle task');
  return response.json();
}
