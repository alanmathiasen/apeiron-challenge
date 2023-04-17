import httpStatus from 'http-status';

const pageNotFoundHandler = (req, res) =>
  res
    .status(httpStatus.NOT_FOUND)
    .json({ message: `404 - Page not found ${req.url}` });

export default pageNotFoundHandler;
