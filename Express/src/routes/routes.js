import express from 'express';
import * as userMiddleware from '~/middleware';
import * as appMiddleware from '~/middleware';
import * as userController from '~/controllers';
import * as appController from '~/controllers';
const Yup = require('yup');

let router = express.Router();

let initWebRoutes = (app) => {
    // AUTH
    router.post('/api/signin', userMiddleware.checkReqSignIn, userController.handleUserSignIn);
    router.post('/api/signup', userMiddleware.checkReqSignUp, userController.handleUserSignUp);
    router.delete('/api/delete-account', userMiddleware.checkReqDeleteAccount, userController.handleDeleteAccount);
    router.post('/api/forgot-password', userMiddleware.checkReqForgotPassword, userController.handleForgotPassword);
    router.get('/reset-password/:id/:token', userController.handleGetResetPassword);
    router.post('/reset-password/:id/:token', userController.handlePostResetPassword);

    // OTHERS
    router.get('/api/search', userMiddleware.checkReqGetSearch, userController.handleGetSearch);
    router.get('/api/get-home-layout', userController.handleGetHomeLayout);
    router.get('/api/get-cv-layout', userMiddleware.checkReqGetCVLayout, userController.handleGetCVLayout);
    router.post('/api/send-cv-by-email', userMiddleware.checkReqSendCVByEmail, userController.handleSendCVByEmail);

    // CRUD USER INFOMATION
    router.put(
        '/api/put-user-information',
        userMiddleware.checkReqUpdateUserInformation,
        userController.handleUpdateUserInformation,
    );

    // CRUD PRODUCT
    router.post('/api/post-product', userMiddleware.checkReqCreateProduct, userController.handleCreateProduct);
    router.put('/api/put-product', userMiddleware.checkReqUpdateProduct, userController.handleUpdateProduct);
    router.delete('/api/delete-product', userMiddleware.checkReqDeleteProduct, userController.handleDeleteProduct);
    router.put('/api/move-product', userMiddleware.checkReqMoveProduct, userController.handleMoveProduct);

    // CRUD TECHNOLOGY
    router.post('/api/post-technology', userMiddleware.checkReqCreateTechnology, userController.handleCreateTechnology);
    router.put('/api/put-technology', userMiddleware.checkReqUpdateTechnology, userController.handleUpdateTechnology);
    router.put(
        '/api/drag-drop-technology',
        userMiddleware.checkReqUpdateMultipleTechnologies,
        userController.handleUpdateMultipleTechnologies,
    );
    router.delete(
        '/api/delete-technology',
        userMiddleware.checkReqDeleteTechnology,
        userController.handleDeleteTechnology,
    );

    // VERIFY
    router.get('/api/verify-user-email', appMiddleware.checkReqVerifyUserEmail, appController.handleVerifyUserEmail);
    router.get('/api/verify-userID', appMiddleware.checkReqVerifyUserID, appController.handleVerifyUserID);
    router.post('/api/change-userID', userMiddleware.checkReqChangeUserID, userController.handleChangeUserID);
    router.post(
        '/api/verify-current-password',
        appMiddleware.checkReqVerifyCurrentPassword,
        appController.handleVerifyCurrentPassword,
    );

    return app.use('/', router);
};

export default initWebRoutes;
