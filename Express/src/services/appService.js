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
                errorMessage: `Email có thể sử dụng để lấy lại mật khẩu`,
            };
        } else {
            return {
                errorCode: 32,
                errorMessage: `Email chưa được đăng ký tài khoản`,
            };
        }
    } catch (error) {
        console.log('An error in handleVerifyUserEmail() in appService.js : ', error);

        return {
            errorCode: 31,
            errorMessage: `Lỗi Server! Không thể xác thực email ☹️`,
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
                errorMessage: `Có thể sử dụng ID này`,
            };
        } else {
            return {
                errorCode: 32,
                errorMessage: `Không thể sử dụng ID này`,
            };
        }
    } catch (error) {
        console.log('An error in handleVerifyUserID() in appService.js : ', error);

        return {
            errorCode: 31,
            errorMessage: `Lỗi Server! Không thể xác thực ID của tài khoản ☹️`,
        };
    }
};

// VERIFY CURRENT PASSWORD
export const handleVerifyCurrentPassword = async (data) => {
    try {
        const { userId, currentPassword } = data;

        const user = await db.users.findOne({
            where: { id: userId },
            attributes: ['password'],
            raw: false,
        });

        if (user) {
            if (user.password) {
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
                    errorCode: 34,
                    errorMessage: `Chưa thiết lập mật khẩu. Vui lòng vào mục "Quên mật khẩu ?" ☹️`,
                };
            }
        } else {
            return {
                errorCode: 32,
                errorMessage: `Hồ sơ của bạn không còn tồn tại. Vui lòng đăng nhập lại ☹️`,
            };
        }
    } catch (error) {
        console.log('An error in handleVerifyCurrentPassword() in appService.js : ', error);

        return {
            errorCode: 31,
            errorMessage: `Lỗi Server! Không thể xác thực mật khẩu hiện tại ☹️`,
        };
    }
};
