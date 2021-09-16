const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    let message;
    const token = req.header("x-auth-token");
    if (!token){
      message = {
        message: "Access denied. No token provide."
      };
      return res.status(403).send(message);
    }
    try {
      const decoded = jwt.verify(token, process.env.JWTKEY);
      req.user = decoded.user;
      next();
    }catch(error){
      message = {
        message: "Access denied. Invalid token."
      };
      return res.status(403).send(message);
    }
}

module.exports = auth;
