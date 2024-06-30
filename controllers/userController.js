const Videos = require('../model/videos');


const userController = {

    exploreAllVideos: async(req,res) => {
        try{
            const allVideos = await Videos.find();
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

    
}

module.exports = userController;