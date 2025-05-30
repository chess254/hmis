module.exports = (err, req, res, next) => {
  console.error(err.stack);
  if (process.env.NODE_ENV === 'development') {
    res.status(500).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Server error' });
  }
};