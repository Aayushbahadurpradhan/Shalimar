const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Please Login",
                error: true,
                success: false
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            if (err) {
                console.error("Error verifying token:", err);
                return res.status(401).json({
                    message: "Unauthorized",
                    error: true,
                    success: false
                });
            }

            req.userId = decoded._id; // Set userId in request for further middleware or route handler
            next();
        });
    } catch (err) {
        console.error("Error in authToken middleware:", err);
        res.status(500).json({
            message: err.message || "Internal Server Error",
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
