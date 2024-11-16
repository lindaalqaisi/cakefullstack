/**
 * Create an error with status code and message
 * @param {number} status - HTTP status code
 * @param {string} message - Error message
 * @returns {Error} Custom error object
 */
export const createError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
};