import express from 'express';
import * as userMiddleware from '~/middleware';
import * as userController from '~/controllers';

let router = express.Router();

let initWebRoutes = (app) => {
    router.post('/signup', userMiddleware.checkReqSignUp, userController.handleUserSignUp);
    router.post('/signin', userMiddleware.checkReqSignIn, userController.handleUserSignIn);

    // CRUD USER INFOMATION
    router.get(
        '/get-user-information',
        userMiddleware.checkReqGetUserInformation,
        userController.handleGetUserInformation,
    );
    router.put(
        '/put-user-information',
        userMiddleware.checkReqUpdateUserInformation,
        userController.handleUpdateUserInformation,
    );

    // CRUD PRODUCT LIST
    router.post('/post-product', userMiddleware.checkReqCreateProduct, userController.handleCreateProduct);
    router.get('/get-product-list', userMiddleware.checkReqGetProductList, userController.handleGetProductList);
    router.put('/put-product', userMiddleware.checkReqUpdateProduct, userController.handleUpdateProduct);
    router.delete('/delete-product', userMiddleware.checkReqDeleteProduct, userController.handleDeleteProduct);

    // CRUD TECHNOLOGY
    router.post('/post-technology', userMiddleware.checkReqCreateTechnology, userController.handleCreateTechnology);
    router.put('/put-technology', userMiddleware.checkReqUpdateTechnology, userController.handleUpdateTechnology);
    router.delete('/delete-technology', userMiddleware.checkReqDeleteTechnology, userController.handleDeleteTechnology);

    return app.use('/', router);
};

export default initWebRoutes;
