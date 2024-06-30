const express = require('express');
const router = express.Router();

const {addNewVideo, getAllVideos, getVideo} = require('../controllers/adminControllers');
const upload = require('../middlewares/multer');


router.post('/addnewvideo',upload, addNewVideo);
router.get('/getallvideos', getAllVideos);
router.get('/getvideo/:id', getVideo);





module.exports = router;