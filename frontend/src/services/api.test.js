import { describe, test, expect, vi, beforeEach } from 'vitest';
import { fetchTasks, createTask, updateTask, deleteTask, toggleTask } from './api';

const BASE_URL = 'http://localhost:4000/api/tasks';

beforeEach(() => {
  vi.restoreAllMocks();
});

function mockFetch(body, status = 200) {
  return vi.spyOn(globalThis, 'fetch').mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  });
}

describe('API CRUD operations', () => {

  test('fetchTasks calls GET and returns tasks', async () => {
    const tasks = [{ id: 1, title: 'Task 1' }];
    const spy = mockFetch(tasks);

    const result = await fetchTasks();

    expect(spy).toHaveBeenCalledWith(BASE_URL);
    expect(result).toEqual(tasks);
  });

  test('createTask sends POST with title, description, priority', async () => {
    const newTask = { id: 1, title: 'Buy milk', description: 'Store', priority: 'High' };
    const spy = mockFetch(newTask, 201);

    const result = await createTask('Buy milk', 'Store', 'High');

    expect(spy).toHaveBeenCalledWith(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Buy milk', description: 'Store', priority: 'High' }),
    });
    expect(result).toEqual(newTask);
  });

  test('updateTask sends PUT with updates', async () => {
    const updated = { id: 1, title: 'Updated', priority: 'Low' };
    const spy = mockFetch(updated);

    const result = await updateTask(1, { title: 'Updated', priority: 'Low' });

    expect(spy).toHaveBeenCalledWith(`${BASE_URL}/1`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Updated', priority: 'Low' }),
    });
    expect(result).toEqual(updated);
  });

  test('deleteTask sends DELETE', async () => {
    const spy = mockFetch(null, 204);

    await deleteTask(1);

    expect(spy).toHaveBeenCalledWith(`${BASE_URL}/1`, { method: 'DELETE' });
  });

  test('toggleTask sends PATCH to toggle endpoint', async () => {
    const toggled = { id: 1, completed: true };
    const spy = mockFetch(toggled);

    const result = await toggleTask(1);

    expect(spy).toHaveBeenCalledWith(`${BASE_URL}/1/toggle`, { method: 'PATCH' });
    expect(result).toEqual(toggled);
  });

  test('createTask throws on error response', async () => {
    mockFetch({ error: 'Title is required' }, 400);

    await expect(createTask('', '', 'Medium')).rejects.toThrow('Title is required');
  });

  test('fetchTasks throws on error response', async () => {
    mockFetch(null, 500);

    await expect(fetchTasks()).rejects.toThrow('Failed to fetch tasks');
  });
});
