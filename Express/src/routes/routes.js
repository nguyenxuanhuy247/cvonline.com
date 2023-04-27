import express from 'express';
import * as userController from '~/controllers';

let router = express.Router();

let initWebRoutes = (app) => {
    // User API
    router.post('/api/login', userController.handleUserLogin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);

    return app.use('/', router);
};

export default initWebRoutes;
