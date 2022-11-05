export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500
  const message = err.message

  // res.status(status).send({
  res.status(status).json({
    // status,
    message,
  })

  // next();
}
