// VERIFY USER EMAIL
export const checkReqVerifyUserEmail = (req, res, next) => {
    const { userEmail } = req.query;

    if (!userEmail) {
        return res.status(400).json({
            errorCode: 11,
            errorMessage: 'Vui lòng nhập Email để lấy lại mật khẩu',
        });
    }

    next();
};

// VERIFY USER ID
export const checkReqVerifyUserID = (req, res, next) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Vui lòng nhập ID mới của tài khoản',
        });
    }

    next();
};

// VERIFY CURRENT PASSWORD
export const checkReqVerifyCurrentPassword = (req, res, next) => {
    const { userId, currentPassword } = req.body;

    if (!userId) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: `Thiếu ID người dùng. Vui lòng đăng nhập lại ☹️`,
        });
    }

    if (!currentPassword) {
        return res.status(400).json({
            errorCode: 11,
            errorMessage: 'Vui lòng nhập mật khẩu hiện tại',
        });
    }

    next();
};
