# Task Manager

Task manager app with React and Express.

## Setup

Open two terminals:

Terminal 1 - backend:
```
cd backend
npm install
npm start
```
runs on port 4000

Terminal 2 - frontend:
```
cd frontend
npm install
npm start
```
runs on port 3000

## API endpoints

```
GET    /api/tasks            - get all tasks
POST   /api/tasks            - create task (send title, description, priority)
PUT    /api/tasks/:id        - update task
DELETE /api/tasks/:id        - delete task
PATCH  /api/tasks/:id/toggle - toggle completed
```

returns 400 for bad input, 404 if not found

## decisions i made

- stored tasks in an array in memory, no db. resets when server restarts
- ids are just numbers (1, 2, 3...)
- carousel is built with css animations, no external library
- filtering and sorting done on the client side
- editing a task reuses the same form, just pre-fills it
- split app.js and server.js so tests can run without starting the server

## time spent

- backend: ~1 hour
- frontend + carousel: ~2 hours
- styling and fixes: ~30 min
- tests: ~30 min
## tests

```
cd backend && npm test
cd frontend && npm test
```