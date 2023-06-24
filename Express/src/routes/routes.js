import express from 'express';
import * as userMiddleware from '~/middleware';
import * as userController from '~/controllers';

let router = express.Router();

let initWebRoutes = (app) => {
    router.post('/signup', userMiddleware.checkReqSignUp, userController.handleUserSignUp);
    router.post('/signin', userMiddleware.checkReqSignIn, userController.handleUserSignIn);

    router.post('/post-technology', userMiddleware.checkReqCreateTechnology, userController.handleCreateTechnology);
    router.get('/get-technology', userMiddleware.checkReqGetTechnology, userController.handleGetTechnology);
    router.put('/put-technology', userMiddleware.checkReqUpdateTechnology, userController.handleUpdateTechnology);
    router.delete('/delete-technology', userMiddleware.checkReqDeleteTechnology, userController.handleDeleteTechnology);

    router.get('/get-user-information', userMiddleware.checkReqGetUserInformation, userController.handleGetUserInformation);
    router.put('/put-user-information', userMiddleware.checkReqUpdateUserInformation, userController.handleUpdateUserInformation);

    
    router.get('/get-product', userController.handleGetProduct);

    return app.use('/', router);
};

export default initWebRoutes;
