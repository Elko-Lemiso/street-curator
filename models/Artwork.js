const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artworkSchema = new Schema({
  city : {type: String, required : true},
  description: {type: String, required: true},
  location : {longitude: Number, latitude: Number},
  artist : {type: String, required : true},
  reviews : [{type: objectId, ref: Review}],
  likes : {type: Number},
  visits : {type: Number},
  pictures : {type: String, required : true},
  incognito : {type: Boolean, required : true}
},{ 
  timestamps : true
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;