import express from 'express';
import * as userController from '~/controllers';

let router = express.Router();

let initWebRoutes = (app) => {
    // User API
    router.post('/api/signin', userController.handleUserSignin);
    router.get('/api/get-all-users', userController.handleGetAllUsers);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    return app.use('/', router);
};

export default initWebRoutes;
