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
// CHECK CRUD LIBRARY

// CREATE LIBRARY
export const checkReqCreateTechnology = (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Vui lòng nhập tên của thư viện',
        });
    }

    next();
};

// READ LIBRARY
export const checkReqGetTechnology = (req, res, next) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Vui lòng nhập id để tải thư viện',
        });
    }

    next();
};

// UPDATE LIBRARY
export const checkReqUpdateTechnology = (req, res, next) => {
    const { id, type, image, name, version } = req.body;

    if (!id) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Vui lòng nhập id để sửa thư viện',
        });
    }

    if (type === 'LIBRARY') {
        if (!(name || version)) {
            return res.status(400).json({
                errorCode: 11,
                errorMessage: 'Hãy thực hiện thao tác xóa',
            });
        }
    } else {
        if (!name) {
            return res.status(400).json({
                errorCode: 12,
                errorMessage: 'Hãy thực hiện thao tác xóa',
            });
        }
    }

    next();
};

// DELETE LIBRARY
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
