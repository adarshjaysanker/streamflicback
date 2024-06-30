const multer = require('multer');

const storage = multer.memoryStorage()

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 10000 * 1024 * 1024
    }
}).fields([
    {name: 'titleBanner', maxCount: 1},
    {name: 'infoBanner', maxCount: 1},
    {name: 'trailerVideo', maxCount: 1},
    {name: 'movieVideo', maxCount: 1},
])

module.exports = upload;