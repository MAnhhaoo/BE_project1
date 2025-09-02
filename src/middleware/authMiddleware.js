const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();

/**
 * Middleware check admin
 */
const authMiddleware = (req, res, next) => {
    // Ưu tiên Authorization: Bearer <token>, fallback sang header "token"
    const authHeader = req.headers['authorization'] || req.headers['token'];

    if (!authHeader) {
        return res.status(401).json({
            status: "err",
            message: "Token is required"
        });
    }

    // Nếu dùng Authorization thì format sẽ là "Bearer <token>"
    const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(' ')[1]
        : authHeader;

    if (!token) {
        return res.status(401).json({
            status: "err",
            message: "Token is missing"
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                status: "err",
                message: "Invalid token"
            });
        }

        // decoded chứa payload (id, isAdmin, ...)
        req.user = decoded; // gắn vào req để dùng ở controller
        if (decoded.isAdmin) {
            next();
        } else {
            return res.status(403).json({
                status: "err",
                message: "You are not admin"
            });
        }
    });
};


/**
 * Middleware check user hoặc admin
 */
const authUserMiddleware = (req, res, next) => {
    const authHeader = req.headers.token['authorization'] || req.headers['token'];

    if (!authHeader) {
        return res.status(401).json({
            status: "err",
            message: "Token is required"
        });
    }

    const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(' ')[1]
        : authHeader;

    if (!token) {
        return res.status(401).json({
            status: "err",
            message: "Token is missing"
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                status: "err",
                message: "Invalid token"
            });
        }

        req.user = decoded;

        // Cho phép nếu là admin hoặc là chính user đó
        if (decoded.isAdmin || decoded.id === req.params.id) {
            next();
        } else {
            return res.status(403).json({
                status: "err",
                message: "Not allowed to access this resource"
            });
        }
    });
};


module.exports = { authMiddleware, authUserMiddleware };
