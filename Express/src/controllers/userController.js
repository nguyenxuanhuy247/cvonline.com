import * as userService from '~/services';

// HANDLE USER CHANGE PASSWORD
export const handleChangePassword = async (req, res) => {
    const data = req.body;

    let message = await userService.postChangePassword(data);

    if (message.errorCode === 0) {
        return res.status(200).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    } else {
        res.status(404).json(message);
    }
};

// HANDLE USER SIGNUP
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

// HANDLE USER SIGNIN
export const handleUserSignIn = async (req, res) => {
    const data = req.body;

    const message = await userService.postUserSignIn(data);

    if (message.errorCode === 0) {
        return res.status(200).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    } else if (message.errorCode === 32 || message.errorCode === 33 || message.errorCode === 34) {
        res.status(404).json(message);
    }
};

// =================================================================
// CRUD USER INFORMATION

// READ USER INFORMATION
export const handleGetUserInformation = async (req, res) => {
    const data = req.query;

    const message = await userService.handleGetUserInformation(data);

    if (message.errorCode === 0) {
        return res.status(200).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    } else if (message.errorCode === 32) {
        res.status(404).json(message);
    }
};

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
    } else if (message.errorCode === 32 || message.errorCode === 33) {
        res.status(404).json(message);
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
    } else if (message.errorCode === 32 || message.errorCode === 33 || message.errorCode === 34) {
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
    } else if (message.errorCode === 32) {
        res.status(409).json(message);
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
    } else if (message.errorCode === 33) {
        res.status(404).json(message);
    }
};
