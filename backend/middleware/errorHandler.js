const errorHandler = (err, res) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong on the server' });
  };
  
module.exports = errorHandler;