// CHECK SIGNUP INFO
export const checkReqSignUp = (req, res, next) => {
    const { fullName, email, password } = req.body;

    if (!fullName) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Vui lòng nhập đầy đủ họ và tên của bạn',
        });
    }

    if (!email) {
        return res.status(400).json({
            errorCode: 11,
            errorMessage: 'Vui lòng nhập email của bạn',
        });
    }

    if (!password) {
        return res.status(400).json({
            errorCode: 12,
            errorMessage: 'Vui lòng nhập mật khẩu của bạn',
        });
    }

    next();
};

// CHECK SIGNIN INFO
export const checkReqSignIn = (req, res, next) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Nhập email của bạn để đăng nhập',
        });
    }

    if (!password) {
        return res.status(400).json({
            errorCode: 11,
            errorMessage: 'Nhập mật khẩu của bạn để đăng nhập',
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
            errorMessage: 'Nhập ID để tải thông tin người dùng',
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
            errorMessage: `Nhập ID để cập nhật ${label}`,
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
            errorMessage: 'Nhập ID người dùng để tạo sản phẩm mới',
        });
    }

    next();
};

// READ PRODUCT
export const checkReqGetProductList = (req, res, next) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Nhập ID người dùng để tải danh sách sản phẩm',
        });
    }

    next();
};

export const checkReqUpdateProduct = (req, res, next) => {
    const { userId, productId, label } = req.body;

    if (!userId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: `Nhập ID người dùng để cập nhật ${label}`,
        });
    }

    if (!productId) {
        return res.status(400).json({
            errorCode: 11,
            errorMessage: `Nhập ID để cập nhật ${label}`,
        });
    }

    next();
};

export const checkReqDeleteProduct = (req, res, next) => {
    const { userId, productId } = req.query;

    if (!userId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Nhập ID người dùng để xóa sản phẩm',
        });
    }

    if (!productId) {
        return res.status(400).json({
            errorCode: 11,
            errorMessage: 'Nhập ID để xóa sản phẩm',
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
            errorMessage: `Nhập ID người dùng để tạo mới ${label}`,
        });
    }

    if (!productId) {
        return res.status(400).json({
            errorCode: 11,
            errorMessage: `Nhập ID sản phẩm để tạo mới ${label}`,
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
    const { userId, type, image, name, version, label } = req.body;

    if (!userId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: `Nhập ID người dùng để cập nhật ${label}`,
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
    const { technologyId, label } = req.query;

    if (!technologyId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: `Nhập ID để xóa ${label}`,
        });
    }

    next();
};
