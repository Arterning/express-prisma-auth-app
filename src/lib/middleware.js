function loggingMiddleware(req, res, next) {
    const time = new Date();
    console.log(`[${time.toLocaleString()}] ${req.method} ${req.url}`);
    next();
}

function errorMiddleware(err, req, res, next) {
    console.error(err);
    res.status(500).send('Internal Server Error');
}

module.exports = { loggingMiddleware, errorMiddleware };
  