function errorHandler(err, req, res, next) {
  const response = {
    message: err.message,
    stack: err.stack,
  };

  if (process.env.NODE_ENV !== "development") response.stack = null;
  res.statusCode === 200 ? res.status(500) : res.status(res.statusCode);
  res.json(response);
}

export default errorHandler;
