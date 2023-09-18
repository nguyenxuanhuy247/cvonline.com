import * as appService from '~/services';

// VERIFY USER EMAIL
export const handleVerifyUserEmail = async (req, res) => {
    const data = req.query;

    let message = await appService.handleVerifyUserEmail(data);

    if (message.errorCode === 0) {
        return res.status(200).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    } else if (message.errorCode === 32) {
        res.status(409).json(message);
    }
};

// VERIFY USER ID
export const handleVerifyUserID = async (req, res) => {
    const data = req.query;

    let message = await appService.handleVerifyUserID(data);

    if (message.errorCode === 0) {
        return res.status(200).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    } else if (message.errorCode === 32) {
        res.status(409).json(message);
    }
};

// VERIFY CURRENT PASSWORD
export const handleVerifyCurrentPassword = async (req, res) => {
    const data = req.body;

    let message = await appService.handleVerifyCurrentPassword(data);

    if (message.errorCode === 0) {
        return res.status(200).json(message);
    } else if (message.errorCode === 31) {
        res.status(503).json(message);
    } else if (message.errorCode === 32 || message.errorCode === 34) {
        res.status(404).json(message);
    } else if (message.errorCode === 33) {
        res.status(409).json(message);
    }
};
