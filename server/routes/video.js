const express = require('express');
const router = express.Router();
const { Video } = require('../models/Video');
const { Subscriber } = require('../models/Subscriber');
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');

// storage multer config
const storage = multer.diskStorage({
  // save folder
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },

  // file name
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// file filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'video/mp4') {
    cb(null, true);
  } else {
    cb({ msg: 'Only mp4 files can be uploaded.' }, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  'file'
);

//=================================
//             Video
//=================================

// save video to server
router.post('/uploadfiles', (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.json({ success: false, err });

    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

// Searches for people subscribed by the user and delivers the video data of the found people to the client
router.post('/getSubscriptionVideos', async (req, res) => {
  try {
    // 1. Find people who subscribe with the user's ID stored in local storage
    const subscriberInfo = await Subscriber.find({
      userFrom: req.body.userFrom,
    }).exec();

    let subscribedUser = [];

    // Contains the IDs of people the user has subscribed to.
    subscriberInfo.map((subscriber) => {
      subscribedUser.push(subscriber.userTo);
    });

    // 2. Take the video of the people you find and deliver it to the client
    // $in: Writers can be found using the IDs of all people in subscribedUser.
    const videos = await Video.find({ writer: { $in: subscribedUser } })
      .populate('writer')
      .exec();

    return res.status(200).json({ success: true, videos });
  } catch (err) {
    return res.status(400).send(err);
  }
});

// After finding the video data using the id, pass it to the client
router.post('/getVideoDetail', async (req, res) => {
  try {
    //Find a video using the videoId sent by the client
    // populate: All data of the user (imported image, name, and other data)
    const videoDetail = await Video.findOne({ _id: req.body.videoId }).populate(
      'writer'
    );
    return res.status(200).json({ success: true, videoDetail });
  } catch (err) {
    return res.status(400).send(err);
  }
});

// Fetch video from mongoDB and pass it to client
router.get('/getVideo', async (req, res) => {
  try {
    const videos = await Video.find().populate('writer').exec();
    res.status(200).json({ success: true, videos });
  } catch (err) {
    return res.status(400).send(err);
  }
});

// Save video data to mongoDB
router.post('/uploadVideo', async (req, res) => {
  const video = new Video(req.body);

  await video
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        success: false,
        err: err,
      });
    });
});

// Create thumbnails using video data and deliver the data to the client
router.post('/thumbnail', (req, res) => {
  let filePath = '';
  let fileDuration = '';

  // Get video data
  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    // req.body.url: uploads mp4 file in folder
    console.dir(metadata);
    console.log(metadata.format.duration);

    fileDuration = metadata.format.duration;
  });

  // Thumbnail creation
  ffmpeg(req.body.url)
    // req.body.url: Video storage path received from client

    // Generate video thumbnail filename
    .on('filenames', function (filenames) {
      console.log('Will generate' + filenames.join(','));
      console.log(filenames);

      filePath = 'uploads/thumbnails/' + filenames[0];
    })
    // Pass data if thumbnail creation is successful
    .on('end', function () {
      console.log('Screenshots taken');

      return res.json({
        success: true,
        url: filePath,
        fileDuration: fileDuration,
      });
    })
    // error handling
    .on('error', function (err) {
      console.log(err);

      return res.json({ success: false, err });
    })
    // Thumbnail Options
    .screenshots({
      count: 3, // Can take 3 thumbnails
      folder: 'uploads/thumbnails', // save folder
      size: '320x240', // thumbnail size
      filename: 'thumbnail-%b.png', // file name (name minus extension)
    });
});

module.exports = router;
