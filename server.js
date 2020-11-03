const express = require('express');
const path = require('path');
const logger = require('./libs/log')/*(module)*/;
const app = express();

const PORT = 3333;

// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(app.router);
app.use(express.static(path.join(__dirname, 'public'))); // запуск статического файлового сервера, который смотрит на папку public/ (в нашем случае отдает index.html)

app.get('/api', (req, resp) => {
  console.log('*** API is requested!');
});

app.get('/ErrorExample', function(req, res, next){
  next(new Error('Random error!'));
});

app.use(function(req, res, next){
  logger.log({
    level: 'error',
    message: `URL is not regignized: ${req.url}`,
    additional: 'properties',
  });
  res.status(404);
  res.send({ error: 'Not found' });
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  logger.log({
    level: 'error',
    message: `Internal error ({res.statusCode}): ${err.message}`,
  });
  res.send({ error: err.message });
  return;
});

app.listen(PORT, () => {
  logger.log({
    level: 'info',
    message: `*** Listening on port ${PORT}.`,
    additional: 'properties',
  });
});
