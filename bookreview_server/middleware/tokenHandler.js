const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
    try {
        let token;
        let authHeader = req.headers.Authorization || req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ message: "User is not authorized" });
                }
                req.user = decoded.user;
                next();
            });

            if (!token) {
                return res.status(401).json({ message: "User is not authorized or token is missing" });
            }
        } else {
            return res.status(401).json({ message: "User is not authorized or token is missing" });
        }
    } catch (error) {
        console.error("Error in validateToken middleware:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const checkAdminRole = (req, res, next) => {
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'You do not have permission to perform this action' });
    }
    next();
};

const checkUserRole = (req, res, next) => {
    if (req.user.role !== 'USER') {
        return res.status(403).json({ message: 'You do not have permission to perform this action' });
    }
    next();
};

module.exports = {
    validateToken,
    checkAdminRole,
    checkUserRole
};
