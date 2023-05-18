const express = require('express');
const router = express.Router();
const { Subscriber } = require('../models/Subscriber');

//=================================
//           Subscribe
//=================================

// Number of subscribers - Find the number of subscribers in the db and send it to the client
router.post('/subscribeNumber', async (req, res) => {
  try {
    const subscribeNumber = await Subscriber.find({
      userTo: req.body.userTo,
    }).exec();

    return res
      .status(200)
      .json({ success: true, subscribeNumber: subscribeNumber.length });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Subscription status - Subscription status information is transferred from the db to the client
router.post('/subscribed', async (req, res) => {
  try {
    const subscribed = await Subscriber.find({
      userTo: req.body.userTo,
      userFrom: req.body.userFrom,
    }).exec();

    let result = false;

  // subscribing
    if (subscribed.length !== 0) {
      result = true;
    }

    return res.status(200).json({ success: true, subscribed: result });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Unsubscribe - find and delete user To, user From in db
router.post('/unSubscribe', (req, res) => {
  try {
    const unSubscribe = Subscriber.findOneAndDelete({
      userTo: req.body.userTo,
      userFrom: req.body.userFrom,
    }).exec();

    res.status(200).json({ success: true, unSubscribe });
  } catch (err) {
    res.status(400).send(err).json({ success: false, err });
  }
});

// Subscribe - Save user To, user From in db
router.post('/subscribe', async (req, res) => {
  try {
    const subscribe = new Subscriber(req.body);

    await subscribe.save();

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).send(err).json({ success: false, err });
  }
});

module.exports = router;
