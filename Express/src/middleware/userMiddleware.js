// CHECK SIGNUP INFO
export const checkReqSignUp = (req, res, next) => {
    const { fullName, email, password } = req.body;

    if (!fullName) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Vui lòng nhập Họ và tên',
        });
    }

    if (!email) {
        return res.status(400).json({
            errorCode: 11,
            errorMessage: 'Vui lòng nhập Email',
        });
    }

    if (!password) {
        return res.status(400).json({
            errorCode: 12,
            errorMessage: 'Vui lòng nhập Mật khẩu',
        });
    }

    next();
};

// CHECK SIGNIN INFO
export const checkReqSignIn = (req, res, next) => {
    const { email, password, isGoogle } = req.body;

    if (!email) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Vui lòng nhập Email',
        });
    }

    if (!isGoogle) {
        if (!password) {
            return res.status(400).json({
                errorCode: 11,
                errorMessage: 'Vui lòng nhập Mật khẩu',
            });
        }
    }

    next();
};

// CHECK FORGOT PASSWORD
export const checkReqForgotPassword = (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Nhập email để lấy lại mật khẩu',
        });
    }

    next();
};

// CHECK RESET PASSWORD
export const checkReqGetResetPassword = (req, res, next) => {
    const { id, token } = req.params;

    if (!email) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Nhập email để lấy lại mật khẩu',
        });
    }

    next();
};
// =================================================================
// CHECK CRUD USER INFORMATION

// READ USER INFORMATION
export const checkReqGetUserInformation = (req, res, next) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Nhập User ID để tải Thông tin người dùng',
        });
    }

    next();
};

// UPDATE USER INFORMATION
export const checkReqUpdateUserInformation = (req, res, next) => {
    const { userId, label } = req.body;

    if (!userId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: `Nhập User ID để cập nhật ${label}`,
        });
    }

    next();
};

// =================================================================
// CHECK CRUD PRODUCT

// CREATE PRODUCT
export const checkReqCreateProduct = (req, res, next) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Nhập User ID để tạo sản phẩm mới',
        });
    }

    next();
};

// READ PRODUCT
export const checkReqGetProduct = (req, res, next) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Nhập User ID để tải danh sách sản phẩm',
        });
    }

    next();
};

// UPDATE PRODUCT
export const checkReqUpdateProduct = (req, res, next) => {
    const { productId, label } = req.body;

    if (!productId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: `Nhập Product ID để cập nhật ${label}`,
        });
    }

    next();
};

// DELETE PRODUCT
export const checkReqDeleteProduct = (req, res, next) => {
    const { productId } = req.query;

    if (!productId) {
        return res.status(400).json({
            errorCode: 11,
            errorMessage: 'Nhập Product ID để xóa sản phẩm',
        });
    }

    next();
};

// MOVE PRODUCT
export const checkReqMoveProduct = (req, res, next) => {
    const { movedItemID, movedItemOrder, siblingItemID, siblingItemOrder } = req.body;

    if (!movedItemID || !siblingItemID) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Nhập Product ID để di chuyển sản phẩm',
        });
    }

    if (!movedItemOrder || !siblingItemOrder) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Nhập Product Order để di chuyển sản phẩm',
        });
    }

    next();
};

// =================================================================
// CHECK CRUD TECHNOLOGY

// CREATE TECHNOLOGY
export const checkReqCreateTechnology = (req, res, next) => {
    const { userId, productId, type, name, link, label } = req.body;

    if (!userId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: `Nhập User ID người dùng để tạo mới ${label}`,
        });
    }

    if (!productId) {
        return res.status(400).json({
            errorCode: 11,
            errorMessage: `Nhập Product ID sản phẩm để tạo mới ${label}`,
        });
    }

    if (type === 'SOURCECODE') {
        if (!name) {
            return res.status(400).json({
                errorCode: 12,
                errorMessage: 'Nhập tên của Source Code mới',
            });
        }

        if (!link) {
            return res.status(400).json({
                errorCode: 13,
                errorMessage: 'Nhập link của Source Code mới',
            });
        }
    } else {
        if (!name) {
            return res.status(400).json({
                errorCode: 14,
                errorMessage: `Nhập tên của ${label} mới`,
            });
        }
    }

    next();
};

// UPDATE TECHNOLOGY
export const checkReqUpdateTechnology = (req, res, next) => {
    const { type, image, name, version, userId, productId, label } = req.body;

    if (!userId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: `Nhập User ID để cập nhật ${label}`,
        });
    }

    if (!productId) {
        return res.status(400).json({
            errorCode: 11,
            errorMessage: `Nhập Product ID để cập nhật ${label}`,
        });
    }

    if (type === 'LIBRARY') {
        if (!(image || name || version)) {
            return res.status(400).json({
                errorCode: 11,
                errorMessage: 'Không thể để trống tất cả thông tin bắt buộc',
            });
        }
    } else {
        if (!(image || name)) {
            return res.status(400).json({
                errorCode: 12,
                errorMessage: 'Không thể để trống tất cả thông tin bắt buộc',
            });
        }
    }

    next();
};

// DELETE TECHNOLOGY
export const checkReqDeleteTechnology = (req, res, next) => {
    const { technologyId, userId, productId, label } = req.query;

    if (!technologyId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: `Nhập Technology ID để xóa ${label}`,
        });
    }

    if (!userId) {
        return res.status(400).json({
            errorCode: 11,
            errorMessage: `Nhập User ID để xóa ${label}`,
        });
    }

    if (!productId) {
        return res.status(400).json({
            errorCode: 12,
            errorMessage: `Nhập Product ID để xóa ${label}`,
        });
    }

    next();
};

// CHANGE USER ID
export const checkReqChangeUserID = (req, res, next) => {
    const { currentID, newID } = req.body;

    if (!currentID) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Vui lòng nhập ID hiện tại của người dùng',
        });
    }

    if (!newID) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Vui lòng nhập ID mới của người dùng',
        });
    }

    next();
};
