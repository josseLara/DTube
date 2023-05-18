const express = require('express');
const router = express.Router();
const { Comment } = require('../models/Comment');

//=================================
//           Comment
//=================================

// Receives the comment information entered by the user, stores it in the DB, and retrieves and returns the author information of the comment
router.post('/saveComment', async (req, res) => {
  try {
    const comment = new Comment(req.body);

    await comment.save();

    const newCommentData = await Comment.find({ _id: comment._id })
      .populate('writer')
      .sort({ _id: -1 })
      .exec();

    return res.status(200).json({ success: true, newCommentData });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post('/getComments', async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.body.videoId })
      .populate('writer')
      .exec();

    return res.status(200).json({ success: true, comments });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
