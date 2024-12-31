const express = require('express');
const { startServer } = require('./promServer');
const promClient = require('prom-client');
const { tracer } = require('./tracing-setup');
const app = express();

const port = 3000;

promClient.collectDefaultMetrics();

app.use((_, __, next) => {
  const span = tracer.startSpan('testMiddleware');

  span.setAttributes({ key: 'testMiddleware' });

  process.stdout.write('{"key":"testMiddleware"}\n');

  setTimeout(() => {
    next();
    span.end();
  }, 100);
});

app.get('/', (req, res) => {
  const span = tracer.startSpan('helloWorld');

  process.stdout.write('{"key":"helloWorld"}\n');
  span.setAttributes({ key: 'helloWorld' });
  res.send('Hello World from app 1\n');
  span.end();
});

app.listen(port, () => {
  console.log(`Server running at ${port}/`);
});

startServer();
