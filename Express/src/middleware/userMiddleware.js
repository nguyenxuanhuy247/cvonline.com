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
            errorMessage: 'Vui lòng nhập email của bạn',
        });
    }

    if (!password) {
        return res.status(400).json({
            errorCode: 11,
            errorMessage: 'Vui lòng nhập mật khẩu của bạn',
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
            errorMessage: 'Vui lòng nhập id để tải thông tin người dùng',
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
            errorMessage: 'Vui lòng nhập id để sửa thông tin người dùng',
        });
    }

    next();
};

// =================================================================
// CHECK CRUD TECHNOLOGY

// CREATE TECHNOLOGY
export const checkReqCreateTechnology = (req, res, next) => {
    const { key, name, link } = req.body;

    if (key === 'SC') {
        if (!name) {
            return res.status(400).json({
                errorCode: 10,
                errorMessage: 'Vui lòng nhập tên của source code',
            });
        }

        if (!link) {
            return res.status(400).json({
                errorCode: 11,
                errorMessage: 'Vui lòng nhập link của source code',
            });
        }
    } else {
        if (!name) {
            return res.status(400).json({
                errorCode: 12,
                errorMessage: 'Vui lòng nhập tên của thư viện',
            });
        }
    }

    next();
};

// UPDATE TECHNOLOGY
export const checkReqUpdateTechnology = (req, res, next) => {
    const { id, type, image, name, version } = req.body;

    if (!id) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Vui lòng nhập id để sửa thư viện',
        });
    }

    if (type === 'LIBRARY') {
        if (!(image || name || version)) {
            return res.status(400).json({
                errorCode: 11,
                errorMessage: 'Hãy thực hiện thao tác xóa',
            });
        }
    } else {
        if (!(image || name)) {
            return res.status(400).json({
                errorCode: 12,
                errorMessage: 'Hãy thực hiện thao tác xóa',
            });
        }
    }

    next();
};

// DELETE TECHNOLOGY
export const checkReqDeleteTechnology = (req, res, next) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Vui lòng nhập id để xóa thư viện',
        });
    }

    next();
};

// =================================================================
// CHECK CRUD PRODUCT
export const checkReqCreateProduct = (req, res, next) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Vui lòng nhập id người dùng để tạo sản phẩm mới',
        });
    }

    next();
};

export const checkReqGetProductList = (req, res, next) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Vui lòng nhập id người dùng để tải danh sách sản phẩm',
        });
    }

    next();
};

export const checkReqUpdateProduct = (req, res, next) => {
    const { userId, productId } = req.body;

    if (!userId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Vui lòng nhập id người dùng để cập nhật sản phẩm',
        });
    }

    if (!productId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Vui lòng nhập id dự án để cập nhật sản phẩm',
        });
    }

    next();
};

export const checkReqDeleteProduct = (req, res, next) => {
    const { userId, productId } = req.query;

    if (!userId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Vui lòng nhập id người dùng để xóa sản phẩm',
        });
    }

    if (!productId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Vui lòng nhập id dự án để xóa sản phẩm',
        });
    }

    next();
};
