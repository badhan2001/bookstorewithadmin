const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    jwt.verify(token, "bookstore123", (err, user) => {
        if (err) {
            return res
                .status(403)
                .json({ message: "Token expired. Please sign in again" });
        }

        req.userId = user.id; // ✅ corrected
        next();
    });
}

module.exports = {authenticateToken}; // ✅ export function directly



//middleware/authenticateToken.js




// const jwt = require("jsonwebtoken");

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) return res.status(401).json({ message: "Token missing" });

//   jwt.verify(token, "YOUR_SECRET_KEY", (err, user) => {
//     if (err) return res.status(403).json({ message: "Invalid token" });

//     req.userId = user.id;
//     next();
//   });
// };

// module.exports = authenticateToken;
