import express from 'express';
import * as userMiddleware from '~/middleware';
import * as userController from '~/controllers';

let router = express.Router();

let initWebRoutes = (app) => {
    router.post('/api/signup', userMiddleware.checkReqSignUp, userController.handleUserSignUp);
    router.post('/api/signin', userMiddleware.checkReqSignIn, userController.handleUserSignIn);
    router.post('/api/change-password', userMiddleware.checkReqChangePassword, userController.handleChangePassword);

    // CRUD USER INFOMATION
    router.get(
        '/api/get-user-information',
        userMiddleware.checkReqGetUserInformation,
        userController.handleGetUserInformation,
    );
    router.put(
        '/api/put-user-information',
        userMiddleware.checkReqUpdateUserInformation,
        userController.handleUpdateUserInformation,
    );

    // CRUD PRODUCT
    router.post('/api/post-product', userMiddleware.checkReqCreateProduct, userController.handleCreateProduct);
    router.get('/api/get-product', userMiddleware.checkReqGetProduct, userController.handleGetProduct);
    router.put('/api/put-product', userMiddleware.checkReqUpdateProduct, userController.handleUpdateProduct);
    router.delete('/api/delete-product', userMiddleware.checkReqDeleteProduct, userController.handleDeleteProduct);
    router.put('/api/move-product', userMiddleware.checkReqMoveProduct, userController.handleMoveProduct);

    // CRUD TECHNOLOGY
    router.post('/api/post-technology', userMiddleware.checkReqCreateTechnology, userController.handleCreateTechnology);
    router.put('/api/put-technology', userMiddleware.checkReqUpdateTechnology, userController.handleUpdateTechnology);
    router.delete(
        '/api/delete-technology',
        userMiddleware.checkReqDeleteTechnology,
        userController.handleDeleteTechnology,
    );

    return app.use('/', router);
};

export default initWebRoutes;
