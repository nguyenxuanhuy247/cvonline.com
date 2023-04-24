import express from 'express';
import * as homeController from '../controllers/homeController.js';

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);

    return app.use('/', router);
};

export default initWebRoutes;
