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

// CREATE TECHNOLOGY
export const handleCreateTechnology = async (req, res) => {
    const data = req.body;
    const message = await userService.handleCreateTechnology(data);

    if (message.errorCode === 0) {
        return res.status(201).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    } else if (message.errorCode === 32) {
        res.status(409).json(message);
    }
};

// READ TECHNOLOGY
export const handleGetTechnology = async (req, res) => {
    const data = req.query;

    const message = await userService.handleGetTechnology(data);

    if (message.errorCode === 0) {
        return res.status(200).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    } else if (message.errorCode === 32) {
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
    }
};

// =================================================================

// SEARCH TECHNOLOGY

export const handleSearchLibrary = async (req, res) => {
    const data = req.query;

    const message = await userService.handleSearchLibrary(data);

    if (message.errorCode === 0) {
        return res.status(200).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    } else if (message.errorCode === 32) {
        res.status(404).json(message);
    }
};

// =================================================================
// Others
// export const handleGetAllUsers = async (req, res) => {
//     let userId = req.query.id;

//     if (!userId) {
//         return res.status(400).json({
//             errorCode: 11,
//             errorMessage: 'Missing required parameter',
//             data: [],
//         });
//     } else {
//         let users = await userService.handleGetAllUsers(userId);

//         return res.status(200).json({
//             errorCode: 0,
//             errorMessage: `OK`,
//             data: users,
//         });
//     }
// };

// export const handleDeleteUser = async (req, res) => {
//     let userId = req.query.id;

//     if (!userId) {
//         return res.status(400).json({
//             errorCode: 1,
//             errorMessage: 'Missing required parameter',
//         });
//     } else {
//         let message = await userService.deleteUser(userId);

//         return res.status(200).json({
//             errorCode: message.errorCode,
//             errorMessage: message.errorMessage,
//         });
//     }
// };
