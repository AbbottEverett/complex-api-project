const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.disable('x-powered-by');
if (process.env.NODE_ENV === 'developer') app.use(morgan('dev'))
app.use(bodyParser.json());

app.get('/ping', (req, res, next) => {
  res.status(200).json({ message: 'PONG'});
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err });
});

app.use((req, res, next) => {
  res.status(404).json({ error: { message: 'Not found' }});
});

function listener() {
  console.log(`Listening on port ${port}!`);
}

app.listen(port, listener);

module.exports = app;
