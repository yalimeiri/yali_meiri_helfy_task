const request = require('supertest');
const app = require('../app');
const taskRoutes = require('../routes/tasks');

beforeEach(() => {
  taskRoutes.resetTasks();
});

describe('GET /api/tasks', () => {

  test('returns empty array when no tasks exist', async () => {
    const response = await request(app).get('/api/tasks');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

});

describe('POST /api/tasks', () => {

  test('returns 400 when title is missing', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ description: 'No title here' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });


  test('defaults priority to Medium', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test priority' });

    expect(response.body.priority).toBe('Medium');
  });
});

describe('PUT /api/tasks/:id', () => {

  test('updates task title', async () => {
    const created = await request(app)
      .post('/api/tasks')
      .send({ title: 'Original' });

    const response = await request(app)
      .put(`/api/tasks/${created.body.id}`)
      .send({ title: 'Updated' });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated');
  });

});

describe('PATCH /api/tasks/:id/toggle', () => {

  test('toggles task from incomplete to complete', async () => {
    const created = await request(app)
      .post('/api/tasks')
      .send({ title: 'Toggle me' });

    expect(created.body.completed).toBe(false);

    const toggled = await request(app)
      .patch(`/api/tasks/${created.body.id}/toggle`);

    expect(toggled.status).toBe(200);
    expect(toggled.body.completed).toBe(true);
  });

});

describe('DELETE /api/tasks/:id', () => {

  test('deletes an existing task', async () => {
    const created = await request(app)
      .post('/api/tasks')
      .send({ title: 'Delete me' });

    const response = await request(app)
      .delete(`/api/tasks/${created.body.id}`);

    expect(response.status).toBe(204);

    const all = await request(app).get('/api/tasks');
    expect(all.body).toHaveLength(0);
  });

  test('returns 404 for non-existent task', async () => {
    const response = await request(app)
      .delete('/api/tasks/9999');

    expect(response.status).toBe(404);
  });
});