import db from '~/models';

// VERIFY USER ID
export const handleVerifyUserID = async (data) => {
    try {
        const { userId } = data;

        const user = await db.users.findOne({
            where: { id: userId },
            attributes: ['id'],
            raw: false,
        });

        if (!user) {
            return {
                errorCode: 0,
                errorMessage: `ID người dùng khả dụng`,
            };
        } else {
            return {
                errorCode: 32,
                errorMessage: `ID người dùng không khả dụng`,
            };
        }
    } catch (error) {
        console.log('An error in handleVerifyUserID() in appService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] Xác thực ID người dùng thất bại`,
        };
    }
};
