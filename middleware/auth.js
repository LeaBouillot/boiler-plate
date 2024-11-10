const { User } = require("../models/User");
let auth = (req, res, next) => {
  // check if user has a token in the cookie
  let token = req.cookies.x_auth;
  // verify the token using the User.findOneToken method in User.js
  User.findOneToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.status(401).json({ isAuth: false, error: true });
    // verify the token
    req.token = token;
    req.user = user;
    next(); // move to the next middleware or route
  });
};

module.exports = { auth };
