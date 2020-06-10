const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName : {type: String, required : true},
  firstName : {type: String, required : true},
  lastName : {type: String, required : true},
  email : {type: String, required : true},
  password : {type: String, required : true},
  profilePicture : {type: String, required : true},
  visits : {type: Number},
  level : {type: Number},
  userType : {type: String, enum :['tourist','artist'], required : true},
  artistArtworks: [{type: ObjectId , ref: Artwork }],
  visitedArtworks: [{type: ObjectId , ref: Artwork }]
},{ 
  timestamps : true
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;