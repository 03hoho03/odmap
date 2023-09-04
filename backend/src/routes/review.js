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
  try {
    const hospitalName = req.body.hospitalName;
    const reviewList = await Review.find({'hospitalName':hospitalName})
    const reviewCount = await Review.countDocuments({'hospitalName':hospitalName});

    return res.status(200).json({reviewList,reviewCount});
  } catch(error) {
    next(error)
  }
})

module.exports = router;