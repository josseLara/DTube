const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; // saltRounds: defines how many letters the salt is
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // remove white space
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastName: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    // token validity period
    type: Number,
  },
});

// Code that encrypts and stores the password only when the password field of the User model is changed
// execute pre-hook function before save() method is executed
userSchema.pre("save", function (next) {
  var user = this;

  // Execute only when password is converted among fields in User Model
  if (user.isModified("password")) {
    // encrypt password
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      // user.password: plain password / hash: encrypted password
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// method to confirm password
userSchema.methods.comparePassword = async function (plainPassword) {
  const user = this; // this = userSchema
  try {
    return await bcrypt.compare(plainPassword, user.password);
  } catch (err) {
    throw new Error(err);
  }
};

// Token creation method
userSchema.methods.generateToken = async function () {
  const user = this;

  const token = jwt.sign(user._id.toHexString(), "secretToken");

  user.token = token;
  await user.save();

  return token;
};

// Token decryption method
userSchema.statics.findByToken = async function (token) {
  const user = this;

 // After finding the user using the user ID
   // Check if the token retrieved from the client and the token stored in the DB match
  try {
    const decoded = jwt.verify(token, "secretToken");
    const foundUser = await user.findOne({ _id: decoded, token: token });
    return foundUser;
  } catch (err) {
    throw err;
  }
};

// wrap schema with model
const User = mongoose.model("User", userSchema);

module.exports = { User };
