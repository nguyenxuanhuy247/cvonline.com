import express from 'express';
import * as userController from '~/controllers';

let router = express.Router();

let initWebRoutes = (app) => {
    router.post('/api/login', userController.handleUserLogin);

    return app.use('/', router);
};

export default initWebRoutes;
