
/**
 * A simple logger middleware for Express.
 It logs the method, URL, timestamp, and IP address of every incoming request.
 This fulfills a specific requirement in your coursework.
 @param {object} req 
 @param {object} res 
 @param {function} next 
 */
function loggerMiddleware(req, res, next) {

  const timestamp = new Date().toISOString();


  const method = req.method;


  const url = req.originalUrl;


  const ip = req.ip;


  console.log(`[${timestamp}] ${method} ${url} - from ${ip}`);

 
  next();
}

module.exports = loggerMiddleware;
