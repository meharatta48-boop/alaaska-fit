export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  // Determine status code
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  if (err.name === 'ValidationError') {
    statusCode = 400;
  }
  
  // Handlers for specific error types
  let message = err.message;
  let errors = null;

  // If Zod validation error
  if (err.issues) {
    statusCode = 400;
    message = 'Validation failed';
    errors = err.issues.map(issue => ({
      field: issue.path.join('.'),
      message: issue.message
    }));
  }

  console.error(`[SERVER_ERROR] ${req.method} ${req.url} - ${err.stack}`);

  res.status(statusCode).json({
    message,
    errors,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};
