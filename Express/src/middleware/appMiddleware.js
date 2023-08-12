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
