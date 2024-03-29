require('dotenv').config()
const jwt = require('jsonwebtoken');

// this is for checking if the token exist on the header or not

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null)
        return res.sendStatus(401);

    jwt.verify(token, progress.env.ACCESS_TOKEN, (err, response) => {
        if (err)
            return res.sendStatus(403);
        res.locals = response;
        next()
    })
}

module.exports = { authenticateToken: authenticateToken }