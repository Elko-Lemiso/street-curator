const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
  fieldname: { type: String}, 
  filename: { type: String},
  originalname: { type: String},
  path: { type: String}, 
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at"}
});

const artworkSchema = new Schema({
  city : {type: String, required: true},
  description: {type: String, required: true},
  location: { type: { type: String }, coordinates: [Number] },
  artist : {type: String, required : true},
  artistId : {type: Schema.ObjectId , ref: 'User'},
  reviews : [{type: Schema.ObjectId , ref: 'Review'}],
  numberOfReviews: {type:Number},
  likes : {type: Number},
  visits : {type: Number},
  picture : pictureSchema,
  incognito : {type: Boolean, required : true}
},{ 
  timestamps : true
});

artworkSchema.index({ location: '2dsphere' });

const Artwork = mongoose.model('Artwork', artworkSchema, 'artworks');

module.exports = Artwork;