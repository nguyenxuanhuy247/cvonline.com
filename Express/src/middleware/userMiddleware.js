import jwt from 'jsonwebtoken';

// =================================================================

// CHECK SIGNIN
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

<<<<<<< HEAD
// CHECK DELETE ACCOUNT
export const checkReqDeleteAccount = (req, res, next) => {
    const cookies = req.cookies;

    if (cookies && cookies.jwt) {
        const token = cookies.jwt;
        const key = process.env.ACCESS_TOKEN_SECRET;

        var decoded = jwt.verify(token, key);

        if (decoded) {
            next();
        } else {
            return res.status(401).json({
                errorCode: 10,
                errorMessage: 'Bạn chưa có quyền, vui lòng đăng nhập',
            });
        }
    } else {
        return res.status(401).json({
            errorCode: 10,
            errorMessage: 'Bạn chưa có quyền, vui lòng đăng nhập',
        });
    }
};

// CHECK FORGOT PASSWORD
export const checkReqForgotPassword = (req, res, next) => {
    const { email } = req.body;
=======
// CHECK SIGNIN INFO
export const checkReqSignIn = (req, res, next) => {
    const { email, password } = req.body;
>>>>>>> edb112d ([Deploy] Fix raw query in BE)

    if (!email) {
        return res.status(400).json({
            errorCode: 10,
<<<<<<< HEAD
            errorMessage: 'Nhập Email để lấy lại mật khẩu',
=======
            errorMessage: 'Vui lòng nhập Email',
>>>>>>> edb112d ([Deploy] Fix raw query in BE)
        });
    }

    next();
};

// =================================================================

// CHECK SEARCH
export const checkReqGetSearch = (req, res, next) => {
    const { searchValue } = req.query;

    if (!searchValue) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Nhập từ khóa tìm kiếm',
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
<<<<<<< HEAD
            errorMessage: 'Thiếu ID người dùng, vui lòng đăng nhập lại',
=======
            errorMessage: 'Nhập User ID để tải Thông tin người dùng',
>>>>>>> edb112d ([Deploy] Fix raw query in BE)
        });
    }

    next();
};

// UPDATE USER INFORMATION
export const checkReqUpdateUserInformation = (req, res, next) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({
            errorCode: 10,
<<<<<<< HEAD
            errorMessage: `Thiếu ID người dùng, vui lòng đăng nhập lại`,
=======
            errorMessage: `Nhập User ID để cập nhật ${label}`,
>>>>>>> edb112d ([Deploy] Fix raw query in BE)
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
<<<<<<< HEAD
            errorMessage: `Thiếu ID người dùng, vui lòng đăng nhập lại`,
=======
            errorMessage: 'Nhập User ID để tạo sản phẩm mới',
>>>>>>> edb112d ([Deploy] Fix raw query in BE)
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
<<<<<<< HEAD
            errorMessage: `Thiếu ID người dùng, vui lòng đăng nhập lại`,
=======
            errorMessage: 'Nhập User ID để tải danh sách sản phẩm',
>>>>>>> edb112d ([Deploy] Fix raw query in BE)
        });
    }

    next();
};

// UPDATE PRODUCT
export const checkReqUpdateProduct = (req, res, next) => {
<<<<<<< HEAD
    const { productId, label } = req.body;

    if (!productId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: `Lỗi! Thiếu Product ID để cập nhật ${label}`,
=======
    const { userId, productId, label } = req.body;

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
>>>>>>> edb112d ([Deploy] Fix raw query in BE)
        });
    }

    next();
};

// DELETE PRODUCT
export const checkReqDeleteProduct = (req, res, next) => {
<<<<<<< HEAD
    const { productId } = req.query;
=======
    const { userId, productId } = req.query;

    if (!userId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Nhập User ID người dùng để xóa sản phẩm',
        });
    }
>>>>>>> edb112d ([Deploy] Fix raw query in BE)

    if (!productId) {
        return res.status(400).json({
            errorCode: 11,
<<<<<<< HEAD
            errorMessage: 'Lỗi! Thiếu Product ID để xóa sản phẩm',
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
            errorMessage: 'Lỗi! Thiếu Product ID để di chuyển sản phẩm',
        });
    }

    if (!movedItemOrder || !siblingItemOrder) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Lỗi! Thiếu Product Order để di chuyển sản phẩm',
=======
            errorMessage: 'Nhập Product ID để xóa sản phẩm',
>>>>>>> edb112d ([Deploy] Fix raw query in BE)
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
<<<<<<< HEAD
            errorMessage: `Thiếu ID người dùng để tạo mới ${label}. Vui lòng đăng nhập lại`,
=======
            errorMessage: `Nhập User ID người dùng để tạo mới ${label}`,
>>>>>>> edb112d ([Deploy] Fix raw query in BE)
        });
    }

    if (!productId) {
        return res.status(400).json({
            errorCode: 11,
<<<<<<< HEAD
            errorMessage: `Lỗi! Thiếu Product ID sản phẩm để tạo mới ${label}`,
=======
            errorMessage: `Nhập Product ID sản phẩm để tạo mới ${label}`,
>>>>>>> edb112d ([Deploy] Fix raw query in BE)
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
<<<<<<< HEAD
            errorMessage: `Thiếu ID người dùng để cập nhật ${label}. Vui lòng đăng nhập lại`,
        });
    }

    if (!productId) {
        return res.status(400).json({
            errorCode: 11,
            errorMessage: `Lỗi! Thiếu Product ID để cập nhật ${label}`,
=======
            errorMessage: `Nhập User ID để cập nhật ${label}`,
>>>>>>> edb112d ([Deploy] Fix raw query in BE)
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

// DRAG AND DROP TECHNOLOGY
export const checkReqUpdateMultipleTechnologies = (req, res, next) => {
    const { updateData } = req.body;

    const isArray = Array.isArray(updateData);
    const length = updateData.length > 0;

    if (!isArray && !length) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: `Không thể sắp xếp lại danh sách`,
        });
    }

    next();
};

// DELETE TECHNOLOGY
export const checkReqDeleteTechnology = (req, res, next) => {
    const { technologyId, label } = req.query;

    if (!technologyId) {
        return res.status(400).json({
            errorCode: 10,
<<<<<<< HEAD
            errorMessage: `Thiếu Technology ID để xóa ${label}`,
        });
    }

    next();
};

// =================================================================
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

// SEND CV VIA EMAIL
export const checkReqSendCVByEmail = (req, res, next) => {
    const { from, to, subject } = req.body;

    if (!to) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Vui lòng nhập Email của nhà tuyển dụng',
        });
    }

    if (!subject) {
        return res.status(400).json({
            errorCode: 11,
            errorMessage: 'Vui lòng nhập tiêu đề của email gửi nhà tuyển dụng',
        });
    }

    if (!from) {
        return res.status(400).json({
            errorCode: 12,
            errorMessage: 'Vui lòng nhập Email của bạn',
=======
            errorMessage: `Nhập Technology ID để xóa ${label}`,
>>>>>>> edb112d ([Deploy] Fix raw query in BE)
        });
    }

    next();
};
