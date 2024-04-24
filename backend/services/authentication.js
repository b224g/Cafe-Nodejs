require('dotenv').config()
const jwt = require('jsonwebtoken');

// this is for checking if the token exist on the header or not

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
   /* if (!token)
        console.log('No token provided.');
        return res.sendStatus(401);

    jwt.verify(token, progress.env.ACCESS_TOKEN, (err, response) => {
        if (err)
            console.log('token verification failed.', err.message);
            return res.sendStatus(403);
        console.log('Token verified successfully.');
        res.locals = response;
        next();
    })*/
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
