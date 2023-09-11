import * as userService from '~/services/userService.js';
import * as emailService from '~/services/emailService.js';
require('dotenv').config();
const yup = require('yup');

// =================================================================

// SIGNIN
export const handleUserSignIn = async (req, res) => {
    const data = req.body;

    const message = await userService.postUserSignIn(data);

    if (message.errorCode === 0) {
        res.cookie('jwt', message.token, { httpOnly: true });
        return res.status(200).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    } else if (message.errorCode === 32) {
        res.status(404).json(message);
    } else if (message.errorCode === 33) {
        res.status(409).json(message);
    }
};

// SIGNUP
export const handleUserSignUp = async (req, res) => {
    const data = req.body;

    let message = await userService.postUserSignUp(data);

    if (message.errorCode === 0) {
        return res.status(201).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    } else if (message.errorCode === 32) {
        res.status(409).json(message);
    }
};

// DELETE ACCOUNT
export const handleDeleteAccount = async (req, res) => {
    const data = req.query;

    const message = await userService.deleteAccount(data);

    if (message.errorCode === 0) {
        return res.status(200).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    }
};

// FORGOT PASSWORD
export const handleForgotPassword = async (req, res) => {
    const data = req.body;

    let message = await emailService.handleSendEmailResetPassword(data);

    if (message.errorCode === 0) {
        return res.status(200).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    } else if (message.errorCode === 32) {
        res.status(404).json(message);
    }
};

// RESET PASSWORD
export const handleGetResetPassword = async (req, res) => {
    const { id, token } = req.params;
    if (id && token) {
        let message = await userService.handleGetResetPassword(id, token);

        if (message.errorCode === 0) {
            return res.render('reset-password', {
                errorCode: 1,
                errorMessage: '',
                values: { password: '', confirmedPassword: '' },
                href: process.env.EXPRESS_FRONTEND_URL,
                fieldError: '',
            });
        }
    }

    return res.render('reset-password-redirect.ejs', {
        message: 'Liên kết đã hết hiệu lực',
        redirectURL: `${process.env.EXPRESS_FRONTEND_URL}/forgot-password`,
    });
};

export const handlePostResetPassword = async (req, res) => {
    const { id, token } = req.params;

    if ((id, token)) {
        const schema = yup.object().shape({
            confirmedPassword: yup
                .string()
                .required('Hãy xác nhận mật khẩu mới')
                .oneOf([yup.ref('password'), null], 'Xác nhận mật khẩu không trùng khớp'),
            password: yup
                .string()
                .required('Hãy nhập mật khẩu mới')
                .min(6, 'Mật khẩu phải có độ dài tối thiểu 6 ký tự')
                .max(25, 'Mật khẩu chỉ được độ dài tối đa 25 ký tự')
                .matches(/.*\W.*/, 'Mật khẩu phải bao gồm ký tự đặc biệt')
                .matches(/.*\d.*/, 'Mật khẩu phải bao gồm chữ số')
                .matches(/.*[a-z].*/, 'Mật khẩu phải bao gồm chữ thường')
                .matches(/.*[A-Z].*/, 'Mật khẩu phải bao gồm chữ hoa'),
        });

        try {
            const submittedData = await schema.validate(req.body);
            const password = submittedData.password;

            const message = await userService.handlePostResetPassword(id, password);
            if (message.errorCode === 0) {
                return res.render('reset-password.ejs', {
                    errorCode: message.errorCode,
                    errorMessage: '',
                    values: { password: '', confirmedPassword: '' },
                    href: process.env.EXPRESS_FRONTEND_URL,
                    fieldError: '',
                });
            } else {
                return res.render('reset-password.ejs', {
                    errorCode: message.errorCode,
                    errorMessage: message.errorMessage,
                    values: { password: '', confirmedPassword: '' },
                    href: process.env.EXPRESS_FRONTEND_URL,
                    fieldError: '',
                });
            }
        } catch (error) {
            return res.render('reset-password.ejs', {
                errorCode: 1,
                errorMessage: error.message,
                values: error.value,
                href: process.env.EXPRESS_FRONTEND_URL,
                fieldError: error.path,
            });
        }
    } else {
        return res.render('reset-password-redirect.ejs', {
            message: 'Liên kết đã hết hiệu lực',
            redirectSite: `${process.env.EXPRESS_FRONTEND_URL}/forgot-password`,
        });
    }
};

// =================================================================
// SEARCH PRODUCT
export const handleGetSearch = async (req, res) => {
    const data = req.query;
    const message = await userService.handleGetSearch(data);

    if (message.errorCode === 0) {
        return res.status(200).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    } else if (message.errorCode === 32) {
        res.status(404).json(message);
    }
};

// READ HOME LAYOUT
export const handleGetHomeLayout = async (req, res) => {
    const message = await userService.handleGetHomeLayout();

    if (message.errorCode === 0) {
        return res.status(200).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    } else if (message.errorCode === 32) {
        res.status(404).json(message);
    }
};

// READ CV LAYOUT
export const handleGetCVLayout = async (req, res) => {
    const { userId } = req.query;
    const message = await userService.handleGetCVLayout(userId);

    if (message.errorCode === 0) {
        return res.status(200).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    } else if (message.errorCode === 32 || message.errorCode === 33) {
        res.status(404).json(message);
    }
};

// SEND CV VIA EMAIL
export const handleSendCVByEmail = async (req, res) => {
    const data = req.body;

    const message = await emailService.handleSendCVByEmail(data);

    if (message.errorCode === 0) {
        return res.status(200).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    } else if (message.errorCode === 32) {
        res.status(404).json(message);
    }
};

// =================================================================
// CRUD USER INFORMATION

// UPDATE USER INFORMATION
export const handleUpdateUserInformation = async (req, res) => {
    const data = req.body;
    const message = await userService.handleUpdateUserInformation(data);

    if (message.errorCode === 0) {
        return res.status(200).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    } else if (message.errorCode === 32) {
        res.status(404).json(message);
    }
};

// =================================================================
// CRUD PRODUCT LIST

// CREATE PRODUCT
export const handleCreateProduct = async (req, res) => {
    const data = req.query;

    const message = await userService.handleCreateProduct(data);
    if (message.errorCode === 0) {
        return res.status(200).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    }
};

// READ PRODUCT LIST
export const handleGetProduct = async (req, res) => {
    const data = req.query;

    const message = await userService.handleGetProduct(data);
    if (message.errorCode === 0) {
        return res.status(200).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    } else if (message.errorCode === 32) {
        res.status(404).json(message);
    }
};

// UPDATE PRODUCT
export const handleUpdateProduct = async (req, res) => {
    const data = req.body;

    const message = await userService.handleUpdateProduct(data);
    if (message.errorCode === 0) {
        return res.status(200).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    } else if (message.errorCode === 32) {
        res.status(404).json(message);
    }
};

// DELETE PRODUCT
export const handleDeleteProduct = async (req, res) => {
    const data = req.query;

    const message = await userService.handleDeleteProduct(data);
    if (message.errorCode === 0) {
        return res.status(200).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    } else if (message.errorCode === 32) {
        res.status(404).json(message);
    }
};

// MOVE PRODUCT
export const handleMoveProduct = async (req, res) => {
    const data = req.body;

    const message = await userService.handleMoveProduct(data);
    if (message.errorCode === 0) {
        return res.status(200).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    } else if (message.errorCode === 32) {
        res.status(404).json(message);
    }
};

// =================================================================
// CRUD TECHNOLOGY

// CREATE TECHNOLOGY
export const handleCreateTechnology = async (req, res) => {
    const data = req.body;
    const message = await userService.handleCreateTechnology(data);

    if (message.errorCode === 0) {
        return res.status(201).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    } else if (message.errorCode === 33) {
        res.status(404).json(message);
    }
};

// UPDATE TECHNOLOGY
export const handleUpdateTechnology = async (req, res) => {
    const data = req.body;

    const message = await userService.handleUpdateTechnology(data);

    if (message.errorCode === 0) {
        return res.status(200).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    } else if (message.errorCode === 32) {
        res.status(404).json(message);
    }
};

// DELETE TECHNOLOGY
export const handleDeleteTechnology = async (req, res) => {
    const data = req.query;

    const message = await userService.handleDeleteTechnology(data);

    if (message.errorCode === 0) {
        return res.status(200).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    } else if (message.errorCode === 32) {
        res.status(404).json(message);
    }
};

// DRAG AND DROP TECHNOLOGY
export const handleUpdateMultipleTechnologies = async (req, res) => {
    const data = req.body;

    const message = await userService.handleUpdateMultipleTechnologies(data);

    if (message.errorCode === 0) {
        return res.status(200).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    }
};

// =================================================================
// CHANGE USER ID
export const handleChangeUserID = async (req, res) => {
    const data = req.body;

    let message = await userService.handleChangeUserID(data);

    if (message.errorCode === 0) {
        return res.status(200).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    } else if (message.errorCode === 32) {
        res.status(404).json(message);
    }
};
