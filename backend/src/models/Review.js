const {default:mongoose} = require('mongoose');

const reviewSchema = new mongoose.Schema({
  writerName:{
    type:String,
  },
  writerId:{
    type:String,
  },
  content: {
    type:String,
    trim:true,
  },
  date:{
    type:Number,
  },
  hospitalName: {
    type:String,
  }
});

const Review = mongoose.model('Review',reviewSchema);

module.exports = Review;