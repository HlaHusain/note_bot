// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[0];

//     if (!token) {
//       return res.status(401).json({ message: "Authentication failed !!" });
//     }
//     const decodedToken = jwt.verify(token, "dont share");

//     req.userData = { userId: decodedToken.userId };

//      next();
//   } catch (err) {
//     return res.status(401).json({ message: "Authentication failed !" });
//   }
// };
module.exports = (req, res, next) => {
  // Bypass the authentication check and allow all requests
  next();
};
