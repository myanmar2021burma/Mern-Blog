
class HttpError extends Error {
    constructor(message, errorCode) {
        super(message);
        this.code = errorCode;
    }
}

// 404 Not Found Middleware
const notFound = (req, res, next) => {
    const error = new HttpError(
        `Not Found - ${req.originalUrl}`,
        404
    );

    next(error);
};

// General Error Handler
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || err.code || res.statusCode || 500;

    res.status(statusCode).json({
        message: err.message || 'Something went wrong',
        stack: process.env.NODE_ENV === 'production'
            ? null
            : err.stack
    });
};

// Export
module.exports = {
    HttpError,
    notFound,
    errorHandler
};
