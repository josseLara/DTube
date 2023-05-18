const { User } = require("../models/User");

// Authentication processing middleware
let auth = async (req, res, next) => {
  try {
    // Get token from client cookie
    const token = req.cookies.x_auth;

    // token - Find the user after decrypting
    const user = await User.findByToken(token);

    if (!user) {
      return res.json({ isAuth: false, error: true });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { auth };
