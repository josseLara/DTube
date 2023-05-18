const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');

//=================================
//             User
//=================================

// certification
router.get('/auth', auth, async (req, res) => {
  try {
    // Pass data to client if passed through auth middleware
    res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      image: req.user.image,
    });
  } catch (err) {
    next(err);
  }
});

// join the membership
router.post('/register', async (req, res) => {
  const user = new User(req.body); // create instance

 // Store the data received from the client in the User Model (DB)
  await user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        err: err,
      });
    });
});

// log in
router.post('/login', async (req, res) => {
  try {
   // Find the requested email in DB
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: 'There are no users with the provided email.',
      });
    }

    // If there is a requested email, check if the password matches
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.json({
        loginSuccess: false,
        message: 'Password is incorrect.',
      });
    }

    // Generate token if password matches
    const token = await user.generateToken();

  // save token to cookie
    res
      .cookie('x_auth', token)
      .status(200)
      .json({ loginSuccess: true, userId: user._id });
  } catch (err) {
    return res.status(400).send(err);
  }
});

// log out
router.get('/logout', auth, async (req, res) => {
  try {
   // retrieved from auth middleware and found
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { token: '' }
    );

    if (!user) {
      return res.json({ success: false, message: 'Failed to logout' });
    }

    return res.status(200).send({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
