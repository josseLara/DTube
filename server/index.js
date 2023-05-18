// backend server
const express = require('express');
const app = express();
const config = require('./config/key');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config()
// mongoose connection
const mongoose = require('mongoose');
mongoose
  .connect(config.mongoURI )
  .then(() => {
    console.log('MongoDB Connected...');
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/video', require('./routes/video'));
app.use('/api/subscribe', require('./routes/subscribe'));
app.use('/api/comment', require('./routes/comment'));

// Serving static assets when in production
if (process.env.NODE_ENV === 'production') {
  // static folder settings
  app.use(express.static('/client/build'));

  // index.html for all page routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Check port connection
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server Running at ${port}`));
