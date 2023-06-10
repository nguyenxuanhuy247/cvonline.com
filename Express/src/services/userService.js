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
            userData.errorCode = 30;
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
                    userData.errorCode = 32;
                    userData.errorMessage = `Sai mật khẩu. Vui lòng kiểm tra lại`;
                }
            } else {
                userData.errorCode = 33;
                userData.errorMessage = `Không tìm thấy người dùng`;
            }
        } else {
            userData.errorCode = 31;
            userData.errorMessage = `Email của bạn không tồn tại trên hệ thống. Vui lòng nhập email khác`;
        }

        return userData;
    } catch (error) {
        console.log('An error in postUserSignIn() in userService.js : ', error);
    }
};

// =================================================================
// HANDLE CRUD TECHNOLOGY

// CREATE TECHNOLOGY
export const handleCreateTechnology = async (data) => {
    try {
        const { type, key, side, image, name, version, link } = data;

        const [user, created] = await db.Technology.findOrCreate({
            where: {
                side: side,
                name: name,
            },
            defaults: {
                type: type,
                key: key,
                side: side,
                image: image,
                version: version,
                link: link,
            },
        });

        if (!created) {
            return {
                errorCode: 31,
                errorMessage: `Trường này đã được tạo`,
            };
        }

        let technologies = await db.Technology.findAll({
            where: { key: key, side: side },
            attributes: ['id', 'image', 'name', 'version', 'link'],
        });

        return {
            errorCode: 0,
            errorMessage: `Tạo dữ liệu thành công`,
            data: technologies,
        };
    } catch (error) {
        console.log('An error in handleCreateTechnology() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `Tải dữ liệu thất bại, không kết nối được với database`,
        };
    }
};

// READ TECHNOLOGY
export const handleGetTechnology = async (data) => {
    try {
        const { key, side, id } = data;
        console.log('key :', key, 'side :', side, 'id :', id);
        
        let technology;

        if (id === 'ALL') {
            technology = await db.Technology.findAll({
                where: { key: key, side: side },
                attributes: ['id', 'image', 'name', 'version', 'link'],
            });

            console.log('findAll: ', technology);
        }

        if (id !== 'ALL') {
            technology = await db.Technology.findOne({
                where: { key: key, side: side, id: id },
                attributes: ['id', 'image', 'name', 'version', 'link'],
            });

            if (!technology) {
                return {
                    errorCode: 32,
                    errorMessage: `Tải dữ liệu thất bại, không tìm thấy dữ liệu khớp id`,
                };
            }
        }

        console.log('handleGetTechnology', technology);

        return {
            errorCode: 0,
            errorMessage: `Tải dữ liệu thành công`,
            data: technology,
        };
    } catch (error) {
        console.log('An error in handleGetTechnology() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `Tải dữ liệu thất bại, không kết nối được với database`,
        };
    }
};

// UPDATE TECHNOLOGY
export const handleUpdateTechnology = async (data) => {
    try {
        const { key, side, id, image, name, version, link } = data;
        await db.Technology.update(
            {
                image: image,
                name: name,
                version: version,
                link: link,
            },
            { where: { id: id } },
        );

        const technologies = await db.Technology.findAll({
            where: { key: key, side: side },
            attributes: ['id', 'image', 'name', 'version', 'link'],
        });

        return {
            errorCode: 0,
            errorMessage: `Sửa dữ liệu thành công`,
            data: technologies,
        };
    } catch (error) {
        console.log('An error in handleUpdateTechnology() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `Sửa dữ liệu thất bại, không kết nối được với database`,
        };
    }
};

// DELETE TECHNOLOGY
export const handleDeleteTechnology = async (data) => {
    try {
        const { key, side, id } = data;
        await db.Technology.destroy({ where: { key: key, side: side, id: id } });

        let technologies = await db.Technology.findAll({
            where: { key: key, side: side },
            attributes: ['id', 'image', 'name', 'version', 'link'],
        });

        return {
            errorCode: 0,
            errorMessage: `Xóa thư viện thành công`,
            data: technologies,
        };
    } catch (error) {
        console.log('An error in handleDeleteTechnology() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `Xóa thư viện thất bại, không kết nối được với database`,
        };
    }
};

// =================================================================
// export const handleGetAllUsers = (userId) => {
//     try {
//         let users;
//         if (userId === 'ALL') {
//             users = db.User.findAll();
//         } else if (userId !== 'ALL') {
//             users = db.User.findOne({
//                 where: { id: userId },
//                 attributes: {
//                     exclude: ['password'],
//                 },
//             });
//         }

//         return users;
//     } catch (error) {
//         console.log('An error in handleGetAllUsers() in userService.js : ', error);
//     }
// };

// export const deleteUser = async (userId) => {
//     try {
//         let user = await db.UserInfo.findOne({ where: { id: userId } });

//         if (!user) {
//             return {
//                 errorCode: 2,
//                 errorMessage: 'User not found',
//             };
//         } else {
//             await db.User.destroy({ where: { id: userId } });

//             return {
//                 errorCode: 0,
//                 errorMessage: 'User deleted successfully',
//             };
//         }
//     } catch (error) {
//         console.log('An error in deleteUser() in userService.js : ', error);
//     }
// };
