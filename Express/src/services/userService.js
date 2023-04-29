import db from '~/models';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = async (password) => {
    try {
        let hashPassword = await bcrypt.hashSync(password, salt);
        return hashPassword;
    } catch (error) {
        console.log('An error in hashUserPassword function: ', error);
    }
};

const checkUserEmailInDB = async (userEmail) => {
    try {
        let user = await db.User.findOne({ where: { email: userEmail } });

        if (user) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log('An error in checkUserEmailInDB() in userService.js : ', error);
    }
};

export const handleUserLogin = async (userEmail, userPassword) => {
    try {
        let userData = {};

        // Use email to check whether the user exists
        let isEmailExisted = await checkUserEmailInDB(userEmail);

        if (isEmailExisted) {
            // Get user's data again prevent someone from deleting/changing data
            let user = await db.User.findOne({
                where: { email: userEmail },
                attributes: ['email', 'password', 'firstName', 'lastName', 'roleId'],
            });

            if (user) {
                // Compare password
                let isPasswordMatch = await bcrypt.compareSync(userPassword, user.password);
                if (isPasswordMatch) {
                    delete user.password;

                    userData.errorCode = 0;
                    userData.errorMessage = `OK`;
                    userData.data = user;
                } else {
                    userData.errorCode = 1;
                    userData.errorMessage = `Wrong password`;
                }
            } else {
                userData.errorCode = 2;
                userData.errorMessage = `User's not found`;
            }
        } else {
            userData.errorCode = 3;
            userData.errorMessage = `Your email does not exist in our system. Please try another emal`;
        }

        return userData;
    } catch (error) {
        console.log('An error in handleUserLogin() in userService.js : ', error);
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
        if (userId) {
            let user = await db.User.findOne({ where: { id: userId } });

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
                }
            }
        }
    } catch (error) {
        console.log('An error in deleteUser() in userService.js : ', error);
    }
};
