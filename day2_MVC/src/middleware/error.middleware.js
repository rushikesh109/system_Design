export const errorMiddleware = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
  next();
};

export const errorHandler = (err, req, res, next) => {
  //Log error for debugging
  console.error("ERROR:", err.message);
  console.error("Stack:", err.stack);

  // Default error response
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server error";

  res.status(statusCode).json({
    success: false,
    error: {
      message: message,
      //Only show stack trace in development
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
};

//404 NOT found handler;
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Route ${req.method} ${req.url} not found`,
    },
  });
};
