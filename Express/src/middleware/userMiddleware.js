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

// CHECK SIGNUP
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

// CHECK DELETE ACCOUNT
export const checkReqDeleteAccount = (req, res, next) => {
    const cookies = req.cookies;
    const { userId } = req.query;

    if ((!cookies && !cookies?.jwt) || !userId) {
        return res.status(401).json({
            errorCode: 10,
            errorMessage: 'Bạn chưa có quyền. Vui lòng đăng nhập lại ☹️',
        });
    }

    next();
};

// CHECK FORGOT PASSWORD
export const checkReqForgotPassword = (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Nhập Email để lấy lại mật khẩu',
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
            errorMessage: 'Vui lòng nhập từ khóa tìm kiếm',
        });
    }

    next();
};

// CHECK CV LAYOUT
export const checkReqGetCVLayout = (req, res, next) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Thiếu ID người dùng. Vui lòng đăng nhập lại ☹️',
        });
    }

    next();
};

// SEND CV VIA EMAIL
export const checkReqSendCVByEmail = (req, res, next) => {
    const data = req.body.states;
    const { from, to, subject } = JSON.parse(data);

    const testEmailFormat = (link) => {
        const position = link?.search(/@/);
        return position !== -1 ? true : false;
    };

    if (!to) {
        return res.status(400).json({
            errorCode: 11,
            errorMessage: 'Vui lòng nhập Email của nhà tuyển dụng',
        });
    }

    const hasEmailFormat = testEmailFormat(to);

    if (!hasEmailFormat) {
        return res.status(400).json({
            errorCode: 11,
            errorMessage: 'Vui lòng nhập Email nhà tuyển dụng theo định dạng Gmail',
        });
    }

    if (!subject) {
        return res.status(400).json({
            errorCode: 11,
            errorMessage: 'Vui lòng nhập tiêu đề của Email',
        });
    }

    if (!from) {
        return res.status(400).json({
            errorCode: 11,
            errorMessage: 'Vui lòng nhập Email của bạn',
        });
    }

    next();
};

// =================================================================
// CHECK CRUD USER INFORMATION

// UPDATE USER INFORMATION
export const checkReqUpdateUserInformation = (req, res, next) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: `Thiếu ID người dùng. Vui lòng đăng nhập lại ☹️`,
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
            errorMessage: `Thiếu ID người dùng. Vui lòng đăng nhập lại ☹️`,
        });
    }

    next();
};

// UPDATE PRODUCT
export const checkReqUpdateProduct = (req, res, next) => {
    const { userId, productId } = req.body;

    if (!userId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: `Thiếu ID người dùng. Vui lòng đăng nhập lại ☹️`,
        });
    }

    if (!productId) {
        return res.status(400).json({
            errorCode: 11,
            errorMessage: `Thiếu ID sản phẩm để cập nhật. Vui lòng thử lại ☹️`,
        });
    }

    next();
};

// DELETE PRODUCT
export const checkReqDeleteProduct = (req, res, next) => {
    const { userId, productId } = req.query;

    if (!userId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: `Thiếu ID người dùng. Vui lòng đăng nhập lại ☹️`,
        });
    }

    if (!productId) {
        return res.status(400).json({
            errorCode: 11,
            errorMessage: 'Thiếu ID sản phẩm để xóa. Vui lòng thử lại ☹️',
        });
    }

    next();
};

// MOVE PRODUCT
export const checkReqMoveProduct = (req, res, next) => {
    const { userId, movedItemID, movedItemOrder, siblingItemID, siblingItemOrder } = req.body;

    if (!userId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: `Thiếu ID người dùng. Vui lòng đăng nhập lại ☹️`,
        });
    }

    if (!movedItemID || !siblingItemID) {
        return res.status(400).json({
            errorCode: 11,
            errorMessage: 'Thiếu ID sản phẩm để di chuyển. Vui lòng thử lại ☹️',
        });
    }

    if (!movedItemOrder || !siblingItemOrder) {
        return res.status(400).json({
            errorCode: 11,
            errorMessage: 'Thiếu thứ tự của sản phẩm để di chuyển. Vui lòng thử lại ☹️',
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
            errorMessage: `Thiếu ID người dùng. Vui lòng đăng nhập lại ☹️`,
        });
    }

    if (!productId) {
        return res.status(400).json({
            errorCode: 11,
            errorMessage: `Thiếu ID sản phẩm để tạo mới ${label}. Vui lòng thử lại ☹️`,
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
            errorMessage: `Thiếu ID người dùng. Vui lòng đăng nhập lại ☹️`,
        });
    }

    if (!productId) {
        return res.status(400).json({
            errorCode: 11,
            errorMessage: `Thiếu ID sản phẩm để cập nhật ${label}. Vui lòng thử lại ☹️`,
        });
    }

    if (type === 'LIBRARY') {
        if (!(image || name || version)) {
            return res.status(400).json({
                errorCode: 12,
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
            errorCode: 11,
            errorMessage: `Thiếu ID của ${label} cần xóa`,
        });
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
            errorCode: 11,
            errorMessage: `Không thể sắp xếp lại danh sách`,
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
            errorMessage: `Thiếu ID người dùng. Vui lòng đăng nhập lại ☹️`,
        });
    }

    if (!newID) {
        return res.status(400).json({
            errorCode: 11,
            errorMessage: 'Vui lòng nhập ID mới của người dùng',
        });
    }

    next();
};
