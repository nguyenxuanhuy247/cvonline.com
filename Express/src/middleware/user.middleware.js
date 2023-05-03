export const checkReqSignUp = (req, res, next) => {
    let { firstName, email, password } = req.body;
    
    if (!firstName) {
        return res.status(400).json({
            errorCode: 1,
            errorMessage: 'Missing full name field',
        });
    }

    if (!email) {
        return res.status(400).json({
            errorCode: 2,
            errorMessage: 'Missing email field',
        });
    }

    if (!password) {
        return res.status(400).json({
            errorCode: 3,
            errorMessage: 'Missing password field',
        });
    }
    
    next();
};

export const checkReqSignIn = (req, res, next) => {
    let { email, password } = req.body;

    if (!email) {
        return res.status(400).json({
            errorCode: 1,
            errorMessage: 'Missing email field',
        });
    }

    if (!password) {
        return res.status(400).json({
            errorCode: 2,
            errorMessage: 'Missing password field',
        });
    }

    next();
};
