const express = require('express');
const router = express.Router();

const {exploreAllVideos, getVideo} = require('../controllers/userController');

router.get('/getallvideos', exploreAllVideos);
router.get('/getvideo/:id', getVideo);


module.exports = router;