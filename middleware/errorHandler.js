export const errorResponseHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 400;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.Node_ENV === "PRODUCTION" ? null: err.stack,
    })
}
export const invalidPathHandler = (req, res , next ) => {
    let error = new Error ("Invalid path")
    error.statusCode = 404
    next(error)
}