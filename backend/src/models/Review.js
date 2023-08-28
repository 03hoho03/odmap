const {default:mongoose} = require('mongoose');

const reviewSchema = new mongoose.Schema({
  writerName:{
    type:String,
  },
  writerEmail:{
    type:String,
  },
  content: {
    type:String,
    trim:true,
  },
  date:{
    type:Number,
  }
});

const Review = mongoose.model('Review',reviewSchema);

module.exports = Review;