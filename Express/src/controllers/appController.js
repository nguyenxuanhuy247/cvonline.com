import * as appService from '~/services';

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
