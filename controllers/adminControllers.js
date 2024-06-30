const Video = require('../model/videos');
const uploadFileToS3 = require('../awsS3');



const userController = {

    addNewVideo: async(req,res) => {
        console.log(req.files);
       try{
        const {title, releaseYear, quality, speciality, duration, description, category, genres, certifications, cast} = req.body;

        const titleBannerUrl = req.files.titleBanner ? await uploadFileToS3(req.files.titleBanner[0], `${req.files.titleBanner[0].originalname}`) : null;
        const infoBannerUrl = req.files.infoBanner ? await uploadFileToS3(req.files.infoBanner[0], `${req.files.infoBanner[0].originalname}`) : null;
        const trailerVideoUrl = req.files.trailerVideo ? await uploadFileToS3(req.files.trailerVideo[0], `${req.files.trailerVideo[0].originalname}`) : null;
        const movieVideoUrl = req.files.movieVideo ? await uploadFileToS3(req.files.movieVideo[0], `${req.files.movieVideo[0].originalname}`) : null;
        console.log(movieVideoUrl);
        const newVideo = new Video({
            title: title,
            releaseyear: releaseYear,
            quality: quality,
            speciality: speciality,
            genres: JSON.parse(genres),
            duration: duration,
            description: description,
            certifications: JSON.parse(certifications),
            category: category,
            cast: JSON.parse(cast),
            titleBanner: titleBannerUrl,
            infoBanner: infoBannerUrl,
            trailerVideo: trailerVideoUrl,
            movieVideo: movieVideoUrl,
        });
        const savedNewVideo = await newVideo.save();
      
        res.status(200).json({message: 'Video Added Successfully', savedNewVideo});
       }catch(error){
         console.log(error);
         res.status(500).json({message: 'Something went wrong', error});
       }
    },


    getAllVideos: async(req,res) => {
        try {
            const allVideos = await Video.find();
            const categorizedVideos = allVideos.reduce((acc, video) => {
                if(!acc[video.category]){
                    acc[video.category] = [];
                }
                acc[video.category].push(video);
                return acc
            }, {});
            console.log(categorizedVideos);
            res.json(categorizedVideos);
        }catch(error) {
            console.log(error);
        }
    },

    getVideo: async(req,res) =>{
        try {
            const videoId = req.params.id
            const video = await Video.findById(videoId)
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