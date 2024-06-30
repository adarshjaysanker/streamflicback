const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const clientRoutes = require('./Routes/clientRoutes');
const adminRoutes = require('./Routes/adminRoutes');



const app = express();
const port = process.env.PORT || 5000


app.use(express.json({limit: '10gb'}));
app.use(express.urlencoded({limit: '10gb', extended: true}));
app.use(cors());
app.use('/uploads',express.static(path.join(__dirname, 'uploads')));


app.use('/', clientRoutes);
app.use('/admin', adminRoutes);


const MongoURI = process.env.MongoUrl

mongoose.connect(MongoURI)
.then(() => {
    app.listen(port,() => {
        console.log(`Server is connected to port ${port}`);
    })
})
.catch((error) => {
    console.error('Error connecting to MongoDb: ', error);
})


app.use((err, req, res, next) => {
    console.error(err.stack);
    console.log('something went wrong');
    res.status(500).send('Something went wrong');
})