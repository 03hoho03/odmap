const express = require('express');
const Review = require('../models/Review');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register',auth,async (req,res,next)=>{
  try {
    const review = new Review(req.body);
    review.save();
    return res.sendStatus(201);
  } catch(error) {
    next(error);
  }
})

router.post('/reviewList',async (req,res,next)=>{
  const limit = req.body.limit ? Number(req.body.limit) : 5;
  const skip = req.body.skip ? Number(req.body.skip) : 0;
  try {
    const hospitalName = req.body.hospitalName;
    const reviewItems = await Review.find({'hospitalName':hospitalName})
      .skip(skip)
      .limit(limit);
    const reviewsTotal = await Review.countDocuments({'hospitalName':hospitalName});
    const hasMore = skip+limit < reviewsTotal ? true : false;

    return res.status(200).json({reviewItems,reviewsTotal,hasMore});
  } catch(error) {
    next(error)
  }
})

module.exports = router;