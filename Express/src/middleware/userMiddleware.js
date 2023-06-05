// CHECK SIGNUP INFO
export const checkReqSignUp = (req, res, next) => {
    let { fullName, email, password } = req.body;

    if (!fullName) {
        return res.status(400).json({
            errorCode: 20,
            errorMessage: 'Vui lòng nhập đầy đủ họ và tên của bạn',
        });
    }

    if (!email) {
        return res.status(400).json({
            errorCode: 21,
            errorMessage: 'Vui lòng nhập email của bạn',
        });
    }

    if (!password) {
        return res.status(400).json({
            errorCode: 22,
            errorMessage: 'Vui lòng nhập mật khẩu của bạn',
        });
    }

    next();
};

// CHECK SIGNIN INFO
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

// CHECK ID TO GET LIBRARY
export const checkReqGetLibraries = (req, res, next) => {
    let { id } = req.query;

    if (!id) {
        return res.status(400).json({
            errorCode: 1,
            errorMessage: 'Vui lòng nhập id của thư viện',
        });
    }

    next();
};
