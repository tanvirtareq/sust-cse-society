import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import postRoutes from './routes/posts.js';

import {} from 'dotenv/config.js';



const app= express();
app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));

// app.use(cors({ credentials: true, origin: process.env.FRONT_END_URL }));
app.use(cors());
app.use(cookieParser());
app.use('/', postRoutes);

const CONNECTION_URL = process.env.DB_CONNECTION_URL;

const PORT = process.env.PORT;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT, ()=> console.log('server running on port: '+PORT)))
    .catch((error)=> console.log(error.message ));

    