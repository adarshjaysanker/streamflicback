const Videos = require('../model/videos');
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userController = {

    exploreAllVideos: async(req,res) => {
        try{
            const allVideos = await Videos.find().sort({createdAt: -1});
            const categorizedVideos = allVideos.reduce((acc, video) => {
                if(!acc[video.category]){
                    acc[video.category] = [];
                }
                acc[video.category].push(video);
                return acc
            }, {});
            res.json(categorizedVideos);
        }catch(err){
            res.status(500).json(err);
        }
    },

    getVideo: async(req,res) => {
        try {
           const videoId = req.params.id
           const video = await Videos.findById(videoId)
           if(video){
             res.json(video)
           }else{
            res.status(404).json({message: 'Video not found'});
           }
        }catch(error){
            res.status(500).json(error);
        }
    },

    signUp: async(req,res) => {
        console.log(req.body);
        const {fullname, email, mobilenumber, password} = req.body;
        try{
           const hashedPassword = await bcrypt.hash(password, 10);
           const newUser = new User({
            fullname,
            email,
            mobilenumber,
            password: hashedPassword
           }) ;
           await newUser.save();
           res.status(201).json({message: 'User registered successfully'});
        }catch(error){
            res.status(500).json({error: error.message});
        }
    },

    login: async(req,res) => {
        const {email, password} = req.body;
        try{
            const user = await User.findOne({email});
            if(!user){
                return res.status(400).json({message: 'User not found'});
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({message: 'Invalid password'});
            }
            const token = jwt.sign({id: user._id}, 'secret', {expiresIn: '1h'});
            res.json({token, user});
        }catch(error){
            console.log(error);
            res.status(500).json({error: error.message});
        }
    },

    getHome: async(req,res) => {
        res.json({message: 'welcome to home page'});
    },

    getRandomMovie: async(req,res) => {
        try{
           const count = await Videos.countDocuments();
           const random = Math.floor(Math.random() * count);
           const randomMovie = await Videos.findOne().skip(random);
           res.json({movie: randomMovie});
        }catch(error){
            res.status(500).json({error: 'An error occured while fetching the random movie'});
        }
    }

    
}

module.exports = userController;