const Video = require('../model/videos');
const uploadFileToS3 = require('../awsS3');
const sse = require('../sse')



const userController = {

    addNewVideo: async(req,res) => {
        console.log(req.files);
       try{
        const {title, releaseYear, quality, speciality, duration, description, category, genres, certifications, cast} = req.body;

        const uploadFile = async(files, key) => {
            if(!files || files.length === 0) return null;
            sse.send({[key]: 0});
            const file = files[0]
            const result = await uploadFileToS3(file, `${file.originalname}`);
            sse.send({[key]: 100});
            return result
        }

        const titleBannerUrl = await uploadFile(req.files.titleBanner, 'titleBanner')
        const infoBannerUrl = await uploadFile(req.files.infoBanner, 'infoBanner')
        const trailerVideoUrl = await uploadFile(req.files.trailerVideo, 'trailerVideo')
        const movieVideoUrl = await uploadFile(req.files.movieVideo, 'movieVideo');
        sse.send({database: 0});
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

        console.log(savedNewVideo, 'saved');
      
        sse.send({database: 100});
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