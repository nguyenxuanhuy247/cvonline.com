import * as userService from '~/services';

// Handle Sign Up
export const handleUserSignUp = async (req, res) => {
    let { firstName, lastName, email, password } = req.body;

    let message = await userService.postUserSignUp(firstName, lastName, email, password);

    return res.status(201).json(message);
};

// Handle Sign In
export const handleUserSignIn = async (req, res) => {
    let { email, password } = req.body;

    let message = await userService.postUserSignIn(email, password);

    return res.status(200).json(message);
};


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
