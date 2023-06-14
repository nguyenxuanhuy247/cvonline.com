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

        let whereQuery;
        if (key === 'LI') {
            whereQuery = { side: side, name: name };
        } else {
            whereQuery = { name: name };
        }

        const technology = await db.Technology.findOne({
            where: whereQuery,
            attributes: ['name'],
        });

        if (!technology || technology.name !== name) {
            await db.Technology.create({
                type: type,
                key: key,
                side: side,
                image: image,
                name: name,
                version: version,
                link: link,
            });

            const technologies = await db.Technology.count({
                where: whereQuery,
                attributes: ['id', 'image', 'name', 'version', 'link'],
            });

            const totalPages = Math.ceil(technologies / 10);

            return {
                errorCode: 0,
                errorMessage: `Tạo dữ liệu thành công`,
                totalPages: totalPages,
            };
        } else {
            return {
                errorCode: 32,
                errorMessage: `Dữ liệu đã tồn tại trong Database`,
            };
        }
    } catch (error) {
        console.log('An error in handleCreateTechnology() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `Không kết nối được với Database`,
        };
    }
};

// READ TECHNOLOGY
export const handleGetTechnology = async (data) => {
    try {
        const { key, side, id, page, page_size } = data;

        let whereQuery;
        if (key === 'LI') {
            whereQuery = { key: key, side: side };
        } else {
            whereQuery = { key: key };
        }

        let technology;

        if (id === 'ALL') {
            if (page && page_size && page_size > 0) {
                const pageNumber = parseInt(page);
                const pageSizeNumber = parseInt(page_size);

                const startIndex = (pageNumber - 1) * pageSizeNumber;

                const { count, rows } = await db.Technology.findAndCountAll({
                    where: { key: key, side: side },
                    attributes: ['id', 'image', 'name', 'version', 'link'],
                    offset: startIndex,
                    limit: pageSizeNumber,
                });

                const totalPages = Math.ceil(count / pageSizeNumber);

                return {
                    errorCode: 0,
                    errorMessage: `Tải dữ liệu phân trang thành công`,
                    totalPages: totalPages,
                    data: rows,
                };
            } else {
                technology = await db.Technology.findAll({
                    where: whereQuery,
                    attributes: ['id', 'image', 'name', 'version', 'link'],
                });

                return {
                    errorCode: 0,
                    errorMessage: `Tải tất cả dữ liệu thành công`,
                    data: technology,
                };
            }
        } else {
            console.log(whereQuery);
            technology = await db.Technology.findOne({
                where: { id: id, ...whereQuery },
                attributes: ['id', 'image', 'name', 'version', 'link'],
            });

            if (technology) {
                return {
                    errorCode: 0,
                    errorMessage: `Tải dữ liệu thành công`,
                    data: technology,
                };
            } else {
                return {
                    errorCode: 32,
                    errorMessage: `Không tìm thấy dữ liệu khớp id`,
                };
            }
        }
    } catch (error) {
        console.log('An error in handleGetTechnology() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `Không kết nối được với Database`,
        };
    }
};

// UPDATE TECHNOLOGY
export const handleUpdateTechnology = async (data) => {
    try {
        const { id, image, name, version, link, upId } = data;

        const result = await db.Technology.findOne({
            where: { id: id },
        });
        console.log('handleUpdateTechnology', result);
        if (result) {
            await db.Technology.update(
                { image: image, name: name, version: version, link: link, id: upId },
                { where: { id: id } },
            );

            return {
                errorCode: 0,
                errorMessage: `Sửa dữ liệu thành công`,
            };
        } else {
            return {
                errorCode: 32,
                errorMessage: `Không tìm thấy id trong Database`,
            };
        }
    } catch (error) {
        console.log('An error in handleUpdateTechnology() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `Không kết nối được với Database`,
        };
    }
};

// DELETE TECHNOLOGY
export const handleDeleteTechnology = async (data) => {
    try {
        const { key, side, id } = data;

        const result = await db.Technology.findOne({
            where: { id: id },
        });

        if (result) {
            await db.Technology.destroy({ where: { id: id } });

            return {
                errorCode: 0,
                errorMessage: `Xóa thư viện thành công`,
            };
        } else {
            return {
                errorCode: 32,
                errorMessage: `Không tìm thấy id trong Database`,
            };
        }
    } catch (error) {
        console.log('An error in handleDeleteTechnology() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `Không kết nối được với Database`,
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
