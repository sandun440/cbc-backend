import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  reviewId : {
    type : String,
    required : true,
    unique : true
  },
  productId : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true
  },
  rating : {
    type : Number,
    required : true,
    min: 1,
    max: 5
  },
  date : {
    type : Date,
    default : Date.now,
    required : true
  },
  description : {
    type : String,
    required : true
  },
  isVisible : {
    type : Boolean,
    default : true
  },
}); 

const Review = mongoose.model("Reviews", reviewSchema);

export default Review;