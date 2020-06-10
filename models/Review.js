const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  artWork : {type: ObjectId , ref: Artwork },
  creator : String,
  review : String,
});

const Review = mongoose.model('Review', reviewSchema, 'reviews');

module.exports = Review;