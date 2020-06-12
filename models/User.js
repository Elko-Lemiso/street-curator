const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
    fieldname: { type: String}, 
    filename: { type: String},
    originalname: { type: String},
    path: { type: String}, 
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: [true, 'Username is required.'],
        unique: true
    },
    firstName : {type: String, required : true},
    lastName : {type: String, required : true},
    email: {
        type: String,
        required: [true, 'Email is required.'],
        // this match will disqualify all the emails with accidental empty spaces, missing dots in front of (.)com and the ones with no domain at all
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password : {
        type: String,
        required: [true, 'Password is required.']
    },
    profilePicture : pictureSchema, 
    visits : {type: Number},
    level : {type: Number},
    userType : {type: String, enum :['tourist','artist'], default: 'tourist'},
    artistArtworks: [{type: Schema.ObjectId , ref: 'Artwork' }],
    visitedArtworks: [{type: Schema.ObjectId , ref: 'Artwork' }]
},{ 
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;

