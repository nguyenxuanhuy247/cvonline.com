import * as userService from '~/services';

export const handleUserLogin = async (req, res) => {

    let { email, password } = req.body;

    if (!email || !password) {
        return res.status(500).json({
            errorCode: 10,
            errorMessage: 'Missing email or password field',
        });
    }

    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).json(userData);
};
