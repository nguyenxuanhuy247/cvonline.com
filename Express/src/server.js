import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import configViewEngine from './config/viewEngine.js';
import webRoutes from './routes/routes.js';
import connectDB from './config/connectDB.js';

dotenv.config();

const app = express();

// Config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configViewEngine(app);
webRoutes(app);

connectDB();

let port = process.env.PORT || 1402;
app.listen(port, () => {
    console.log(`Backend Nodejs is running at localhost:${port}`);
});
