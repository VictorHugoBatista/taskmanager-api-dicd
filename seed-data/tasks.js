db = db.getSiblingDB('taskmanager_api');
db.createCollection('tasks');
db.createUser({
  user: 'user-taskmanager_api',
  pwd: '123456',
  roles: [{ role: 'readWrite', db: 'taskmanager_api' }],
});
