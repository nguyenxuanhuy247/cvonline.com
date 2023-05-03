import db from '~/models';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

// Check email function
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

// Hash password function
const hashUserPassword = async (password) => {
    try {
        let hashPassword = await bcrypt.hashSync(password, salt);
        return hashPassword;
    } catch (error) {
        console.log('An error in hashUserPassword() : ', error);
    }
};

// Handle User Sign Up with Database
export const postUserSignUp = async (userFullName, userEmail, userPassword) => {
    try {
        let userData = {};
        let hashPassword = await hashUserPassword(userPassword);

        const [user, created] = await db.User.findOrCreate({
            where: {
                email: userEmail,
            },
            defaults: {
                firstName: userFullName,
                email: userEmail,
                password: hashPassword,
            },
        });

        const oneUser = await db.User.findOne({
            where: {
                email: userEmail,
            },
        });

        if (!created) {
            userData.errorCode = 11;
            userData.errorMessage = `Your email already used. Please try another email`;
        } else {
            userData.errorCode = 0;
            userData.errorMessage = `Your account is created successfully`;
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
                attributes: ['email', 'password', 'firstName', 'lastName'],
            });

            if (user) {
                // Compare password
                let isPasswordMatch = await bcrypt.compareSync(userPassword, user.password);

                if (isPasswordMatch) {
                    delete user.password;

                    userData.errorCode = 0;
                    userData.errorMessage = `Sign in successfully`;
                    userData.data = user;
                } else {
                    userData.errorCode = 11;
                    userData.errorMessage = `Wrong password`;
                }
            } else {
                userData.errorCode = 12;
                userData.errorMessage = `User's not found`;
            }
        } else {
            userData.errorCode = 13;
            userData.errorMessage = `Your email does not exist. Please try another email`;
        }
        console.log(userData);
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
            };
        }
    } catch (error) {
        console.log('An error in deleteUser() in userService.js : ', error);
    }
};
