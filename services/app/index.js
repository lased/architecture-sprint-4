const express = require('express');
const { startServer } = require('./promServer');
const promClient = require('prom-client');
const app = express();

const port = 3000;

promClient.collectDefaultMetrics();

app.get('/', (req, res) => {
  res.send('Hello World\n');
});

app.listen(port, () => {
  console.log(`Server running at ${port}/`);
});

startServer();
