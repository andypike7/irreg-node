const express = require('express');
const path = require('path');
const logger = require('./libs/log')/*(module)*/;
const config = require('./libs/config');

const app = express();

// app.use(express.favicon());
// app.use(express.logger('dev'));
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(app.router);
app.use(express.static(path.join(__dirname, 'public'))); // запуск статического файлового сервера, который смотрит на папку public/ (в нашем случае отдает index.html)

app.get('/api', (req, res) => {
  console.log('*** API is requested!');
  res.send({data: `I'm a data`});
});

app.get('/ErrorExample', function(req, res, next){
  next(new Error('Random error!'));
});

/* --- */
app.get('/api/words', function(req, res) {
  res.send('This method is not implemented now');
});

app.post('/api/words', function(req, res) {
  res.send('This method is not implemented now');
});

app.get('/api/words/:id', function(req, res) {
  res.send('This method is not implemented now');
});

app.put('/api/words/:id', function (req, res){
  res.send('This method is not implemented now');
});

app.delete('/api/words/:id', function (req, res){
  res.send('This method is not implemented now');
});
/* --- */

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

const expressPort = config.get('express:port');

app.listen(expressPort, () => {
  logger.log({
    level: 'info',
    message: `*** Express is listening on port ${expressPort}.`,
    additional: 'properties',
  });
});

const mongoosePort = config.get('mongoose:port');

app.listen(mongoosePort, () => {
  logger.log({
    level: 'info',
    message: `*** Express is listening on port ${mongoosePort}.`,
    additional: 'properties',
  });
});
