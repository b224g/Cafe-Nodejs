require('dotenv').config()
const jwt = require('jsonwebtoken');

// this is for checking if the token exist on the header or not

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        res.sendStatus(401);
      } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, response) => {
          if (err) {
            res.sendStatus(403);
          } else {
            res.locals = response;
            next();
          }
        });
      }
}

module.exports = { authenticateToken: authenticateToken }
