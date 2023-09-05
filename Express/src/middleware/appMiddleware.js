// VERIFY USER EMAIL
export const checkReqVerifyUserEmail = (req, res, next) => {
    const { userEmail } = req.query;

    if (!userEmail) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Vui lòng nhập Email của người dùng',
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
            errorMessage: 'Vui lòng nhập ID mới của người dùng',
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
            errorMessage: 'Vui lòng nhập ID của người dùng',
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
