import db from '~/models';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

// Email check function
const checkUserEmailInDB = async (email) => {
    try {
        let user = await db.User.findOne({ where: { email: email } });

        if (user) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log('An error in checkUserEmailInDB() in userService.js : ', error);
    }
};

// Hash password function
const hashUserPassword = async (password) => {
    try {
        let hashPassword = await bcrypt.hashSync(password, salt);
        return hashPassword;
    } catch (error) {
        console.log('An error in hashUserPassword() : ', error);
    }
};

// Connect signup with Database
export const postUserSignUp = async (fullName, email, password) => {
    try {
        let userData = {};
        let hashPassword = await hashUserPassword(password);

        const [user, created] = await db.User.findOrCreate({
            where: {
                email: email,
            },
            defaults: {
                fullName: fullName,
                email: email,
                password: hashPassword,
            },
        });

        if (!created) {
            userData.errorCode = 31;
            userData.errorMessage = `Email của bạn đã được đăng ký. Vui lòng điền email khác`;
        } else {
            userData.errorCode = 0;
            userData.errorMessage = `Tài khoản được tạo thành công`;
        }

        return userData;
    } catch (error) {
        console.log('An error in postUserSignUp() in userService.js : ', error);
    }
};

// Handle User Sign In with Database
export const postUserSignIn = async (userEmail, userPassword) => {
    try {
        let userData = {};

        // Use email to check whether the user exists
        let isEmailExisted = await checkUserEmailInDB(userEmail);

        if (isEmailExisted) {
            // Get user's data again prevent someone from deleting/changing data
            let user = await db.User.findOne({
                where: { email: userEmail },
                attributes: ['email', 'password', 'fullName'],
            });

            if (user) {
                // Compare password
                let isPasswordMatch = await bcrypt.compareSync(userPassword, user.password);

                if (isPasswordMatch) {
                    delete user.password;

                    userData.errorCode = 0;
                    userData.errorMessage = `Bạn đã đăng nhập thành công`;
                    userData.data = user;
                } else {
                    userData.errorCode = 12;
                    userData.errorMessage = `Sai mật khẩu. Vui lòng kiểm tra lại`;
                }
            } else {
                userData.errorCode = 13;
                userData.errorMessage = `Không tìm thấy người dùng`;
            }
        } else {
            userData.errorCode = 11;
            userData.errorMessage = `Email của bạn không tồn tại trên hệ thống. Vui lòng nhập email khác`;
        }

        return userData;
    } catch (error) {
        console.log('An error in postUserSignIn() in userService.js : ', error);
    }
};

export const handleGetAllUsers = (userId) => {
    try {
        let users;
        if (userId === 'ALL') {
            users = db.User.findAll();
        } else if (userId !== 'ALL') {
            users = db.User.findOne({
                where: { id: userId },
                attributes: {
                    exclude: ['password'],
                },
            });
        }

        return users;
    } catch (error) {
        console.log('An error in handleGetAllUsers() in userService.js : ', error);
    }
};

export const deleteUser = async (userId) => {
    try {
        let user = await db.UserInfo.findOne({ where: { id: userId } });

        if (!user) {
            return {
                errorCode: 2,
                errorMessage: 'User not found',
            };
        } else {
            await db.User.destroy({ where: { id: userId } });

            return {
                errorCode: 0,
                errorMessage: 'User deleted successfully',
            };
        }
    } catch (error) {
        console.log('An error in deleteUser() in userService.js : ', error);
    }
};
