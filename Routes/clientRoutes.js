const express = require('express');
const router = express.Router();

const {exploreAllVideos, getVideo, signUp, login, getHome, getRandomMovie} = require('../controllers/userController');
const verifyToken = require('../middlewares/jwt');

router.get('/getallvideos', exploreAllVideos);
router.get('/getvideo/:id', getVideo);

router.post('/signup', signUp);
router.post('/login', login);

router.get('/gethome', verifyToken, getHome);

router.get('/getrandommovie', getRandomMovie)


module.exports = router;