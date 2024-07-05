const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    title: {
        type: String,
    },
    releaseyear: {
        type: Number
    },
    quality: {
        type: String
    },
    speciality: {
        type: String
    },
    genres: {
        type: Array
    },
    duration: {
        type: String
    },
    description: {
        type: String
    },
    certifications: {
        type: Array
    },
    category: {
        type: String
    },
    cast: {
        type: Array
    },
    titleBanner: {
        type: String
    },
    infoBanner: {
        type: String
    },
    trailerVideo: {
        type: String
    },
    movieVideo: {
        type: String
    }
   
}, {timestamps: true});

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;