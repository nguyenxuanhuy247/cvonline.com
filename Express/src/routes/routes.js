import express from 'express';
// Middlewares
import * as userMiddleware from '~/middleware';
// Controllers
import * as userController from '~/controllers';

let router = express.Router();

let initWebRoutes = (app) => {
    // User API
    router.post('/signup', userMiddleware.checkReqSignUp, userController.handleUserSignUp);
    router.post('/signin', userMiddleware.checkReqSignIn, userController.handleUserSignIn);

    router.post('/post-technology', userMiddleware.checkReqCreateTechnology, userController.handleCreateTechnology);
    router.get('/get-technology', userMiddleware.checkReqGetTechnology, userController.handleGetTechnology);
    router.put('/put-technology', userMiddleware.checkReqUpdateTechnology, userController.handleUpdateTechnology);
    router.delete('/delete-technology', userMiddleware.checkReqDeleteTechnology, userController.handleDeleteTechnology);

    // =================================================================

    // router.get('/api/get-all-users', userController.handleGetAllUsers);
    // router.delete('/api/delete-user', userController.handleDeleteUser);

    router.post('/personal/create-library', userController.handleUserSignIn);

    return app.use('/', router);
};

export default initWebRoutes;
