export const checkReqSignUp = (req, res, next) => {
    let { firstName, lastName, email, password } = req.body;
    
    if (!firstName) {
        return res.status(400).json({
            errorCode: 1,
            errorMessage: 'Vui lòng nhập Tên của bạn',
        });
    }
    
    if (!lastName) {
        return res.status(400).json({
            errorCode: 2,
            errorMessage: 'Vui lòng nhập Họ của bạn',
        });
    }

    if (!email) {
        return res.status(400).json({
            errorCode: 3,
            errorMessage: 'Vui lòng nhập email của bạn',
        });
    }

    if (!password) {
        return res.status(400).json({
            errorCode: 4,
            errorMessage: 'Vui lòng nhập mật khẩu của bạn',
        });
    }
    
    next();
};

export const checkReqSignIn = (req, res, next) => {
    let { email, password } = req.body;

    if (!email) {
        return res.status(400).json({
            errorCode: 1,
            errorMessage: 'Vui lòng nhập email của bạn',
        });
    }

    if (!password) {
        return res.status(400).json({
            errorCode: 2,
            errorMessage: 'Vui lòng nhập mật khẩu của bạn',
        });
    }

    next();
};
