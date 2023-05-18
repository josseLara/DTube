const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema(
  {
    writer: {
      // commenter
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    postId: {
      // video id
      type: Schema.Types.ObjectId,
      ref: 'Video',
    },
    responseTo: {
      // Replies to
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      // comment content
      type: String,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment };
