const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  artwork : {type: Schema.ObjectId , ref: 'Artwork' },
  creator :  {type: String},
  review : {type: String},
});

const Review = mongoose.model('Review', reviewSchema, 'reviews');

module.exports = Review;