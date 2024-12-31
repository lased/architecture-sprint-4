const promClient = require('prom-client');
const express = require('express');
const app = express();

const port = 81;

const startServer = () => {
  app.listen(port, () => {
    console.log(`Prom server running at ${port}/`);
  });
};

app.get('/metrics', (req, res) => {
  promClient.register.metrics().then((metrics) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send(metrics);
  });
});

module.exports = { startServer };
