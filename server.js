const app = require('./app');

const port = process.env.PORT || 7777;

const server = app.listen(port, () => {
  console.log(`Alfred running on: http://localhost:${port}`);
});