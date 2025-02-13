const { logEvents } = require('./logger');

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}\t${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    'errLog.log'
  );

  console.error(err.stack);

  res.status(res.statusCode ? res.statusCode : 500);

  res.json({ message: err.message, stack: err.stack });

  next();
};

module.exports = { errorHandler };
