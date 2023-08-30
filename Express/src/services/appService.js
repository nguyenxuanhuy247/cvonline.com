import db from '~/models';
import bcrypt from 'bcryptjs';

// VERIFY USER EMAIL
export const handleVerifyUserEmail = async (data) => {
    try {
        const { userEmail } = data;

        const user = await db.users.findOne({
            where: { email: userEmail },
            attributes: ['email'],
            raw: false,
        });

        if (user) {
            return {
                errorCode: 0,
                errorMessage: `Email người dùng khả dụng`,
            };
        } else {
            return {
                errorCode: 32,
                errorMessage: `Email người dùng không tồn tại`,
            };
        }
    } catch (error) {
        console.log('An error in handleVerifyUserEmail() in appService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] Xác thực Email người dùng thất bại`,
        };
    }
};

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

// VERIFY USER ID
export const handleVerifyCurrentPassword = async (data) => {
    try {
        const { userId, currentPassword } = data;

        const user = await db.users.findOne({
            where: { id: userId },
            attributes: ['password'],
            raw: false,
        });

        if (user) {
            const isPasswordMatch = await bcrypt.compareSync(currentPassword, user.password);

            if (isPasswordMatch) {
                return {
                    errorCode: 0,
                    errorMessage: `Mật khẩu chính xác`,
                };
            } else {
                return {
                    errorCode: 33,
                    errorMessage: `Mật khẩu không đúng`,
                };
            }
        } else {
            return {
                errorCode: 32,
                errorMessage: `Không tìm thấy người dùng`,
            };
        }
    } catch (error) {
        console.log('An error in handleVerifyCurrentPassword() in appService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] Xác thực mật khẩu thất bại`,
        };
    }
};
