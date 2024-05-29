const jwt = require('jsonwebtoken');

function authUser(req, res, next) {

    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({error: 'Token Not Found'});

    const token = authorization.split(' ')[1];
    if(!token) return res.status(401).json({ error: 'Unauthorized'})
    
    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.SECRET_KEY )

        // Attach user information to the rquest object
        req.user = decoded
        next();

    } catch (error) {
        res.status(401).json({ error: 'Invalid Token' })
    }
}

// Function to generate a JWT token
function generateJWT(userData) {
    return jwt.sign(userData, process.env.SECRET_KEY);
}

module.exports = {authUser, generateJWT};