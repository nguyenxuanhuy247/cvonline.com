import * as userService from '~/services';

// HANDLE USER SIGNUP
export const handleUserSignUp = async (req, res) => {
    let { fullName, email, password } = req.body;

    let message = await userService.postUserSignUp(fullName, email, password);
    return res.status(201).json(message);
};

// HANDLE USER SIGNIN
export const handleUserSignIn = async (req, res) => {
    let { email, password } = req.body;

    let message = await userService.postUserSignIn(email, password);

    return res.status(200).json(message);
};

// =================================================================
// HANDLE CRUD TECHNOLOGY
export const handleGetTechnology = async (req, res) => {
    let id = req.query.id;
    let library = await userService.handleGetTechnology(id);

    return res.status(200).json({
        errorCode: 0,
        errorMessage: `OK`,
        data: users,
    });
};

export const handleCreateTechnology = async (req, res) => {
    let data = req.body;
    let message = await userService.handleCreateTechnology(data);

    return res.status(200).json(message);
};

// =================================================================
// Others
export const handleGetAllUsers = async (req, res) => {
    let userId = req.query.id;

    if (!userId) {
        return res.status(400).json({
            errorCode: 11,
            errorMessage: 'Missing required parameter',
            data: [],
        });
    } else {
        let users = await userService.handleGetAllUsers(userId);

        return res.status(200).json({
            errorCode: 0,
            errorMessage: `OK`,
            data: users,
        });
    }
};

export const handleDeleteUser = async (req, res) => {
    let userId = req.query.id;

    if (!userId) {
        return res.status(400).json({
            errorCode: 1,
            errorMessage: 'Missing required parameter',
        });
    } else {
        let message = await userService.deleteUser(userId);

        return res.status(200).json({
            errorCode: message.errorCode,
            errorMessage: message.errorMessage,
        });
    }
};
