import * as userService from '~/services';

export const handleUserLogin = async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            errorCode: 10,
            errorMessage: 'Missing email or password field',
        });
    }

    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json(userData);
};

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
            errorMessage: message.errorMessage
         });
    }
};
