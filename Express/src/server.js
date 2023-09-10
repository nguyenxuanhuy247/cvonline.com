require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import configViewEngine from '~/config/viewEngine.js';
import webRoutes from '~/routes/routes';
import connectDB from '~/config/connectDB.js';

const app = express();

// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.EXPRESS_FRONTEND_URL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Config app
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

configViewEngine(app);
webRoutes(app);

// Connects to Database
connectDB();

// Listens for connections on localhost:1402
let port = process.env.PORT || 1402;

app.listen(port, () => {
    console.log(`Backend Nodejs is running at localhost:${port}`);
});
