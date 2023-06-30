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

        if (created) {
            await db.Technology.create({
                type: 'PRODUCTDESC',
                key: 'PD',
                userId: user.id,
            });

            return {
                errorCode: 0,
                errorMessage: `Tài khoản được tạo thành công`,
            };
        } else {
            return {
                errorCode: 32,
                errorMessage: `Email của bạn đã được đăng ký`,
            };
        }
    } catch (error) {
        console.log('An error in postUserSignUp() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `Không kết nối được với Database`,
        };
    }
};

// Handle User Sign In with Database
export const postUserSignIn = async (userEmail, userPassword) => {
    try {
        // Use email to check whether the user exists
        let isEmailExisted = await checkUserEmailInDB(userEmail);

        if (isEmailExisted) {
            // Get user's data again prevent someone from deleting/changing data
            let user = await db.User.findOne({
                where: { email: userEmail },
                attributes: {
                    exclude: ['createdAt', 'updatedAt'],
                },
            });

            if (user) {
                // Compare password
                let isPasswordMatch = await bcrypt.compareSync(userPassword, user.password);

                if (isPasswordMatch) {
                    delete user.password;

                    return {
                        errorCode: 0,
                        errorMessage: `Đăng nhập thành công`,
                        data: user,
                    };
                } else {
                    return {
                        errorCode: 34,
                        errorMessage: `Sai mật khẩu. Vui lòng kiểm tra lại`,
                    };
                }
            } else {
                return {
                    errorCode: 33,
                    errorMessage: `Không tìm thấy người dùng`,
                };
            }
        } else {
            userData.errorCode = 32;
            userData.errorMessage = `Email không tồn tại trên hệ thống`;
        }

        return userData;
    } catch (error) {
        console.log('An error in postUserSignIn() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `Không kết nối được với Database`,
        };
    }
};

// =================================================================
// CRUD TECHNOLOGY

// CREATE TECHNOLOGY
export const handleCreateTechnology = async (data) => {
    try {
        const { type, key, side, image, name, version, link, userId, productId } = data;

        let whereQuery;
        if (type === 'SOURCECODE') {
            whereQuery = { name: name, userId: userId, productId: productId };
        } else {
            whereQuery = { side: side, name: name, userId: userId, productId: productId };
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
                userId: userId,
                productId: productId,
            });

            return {
                errorCode: 0,
                errorMessage: `Tạo dữ liệu thành công`,
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

// UPDATE TECHNOLOGY
export const handleUpdateTechnology = async (data) => {
    try {
        const { id, image, name, version, link } = data;

        const result = await db.Technology.findOne({
            where: { id: id },
            raw: false,
        });

        if (result) {
            if (image) {
                result.image = image;
            }
            result.name = name;
            result.version = version;
            result.link = link;

            await result.save();

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
        const { id } = data;

        const result = await db.Technology.findOne({
            where: { id: id },
        });

        if (result) {
            await db.Technology.destroy({ where: { id: id } });

            return {
                errorCode: 0,
                errorMessage: `Xóa thành công`,
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
// CRUD USER INFORMATION

// READ USER INFORMATION
export const handleGetUserInformation = async (data) => {
    try {
        const { id } = data;

        let user = await db.User.findOne({
            where: { id: id },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        });

        if (user) {
            return {
                errorCode: 0,
                errorMessage: `Tải dữ liệu người dùng thành công`,
                data: user,
            };
        } else {
            return {
                errorCode: 32,
                errorMessage: `Không tìm thấy thông tin người dùng`,
            };
        }
    } catch (error) {
        console.log('An error in handleGetUserInformation() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `Không kết nối được với Database`,
        };
    }
};

// UPDATE USER INFORMATION
export const handleUpdateUserInformation = async (data) => {
    try {
        const { id, avatar, fullName, dateOfBirth } = data;

        const newData = { ...data };
        delete newData.id;

        const user = await db.User.findOne({
            where: { id: id },
            raw: false,
        });
        console.log('user', user);
        if (user) {
            for (let prop in newData) {
                if (newData[prop] !== undefined) {
                    user[prop] = newData[prop];
                }
            }

            console.log('change user', user);
            await user.save();

            return {
                errorCode: 0,
                errorMessage: `Sửa thông tin người dùng thành công`,
            };
        } else {
            return {
                errorCode: 32,
                errorMessage: `Không tìm thấy id người dùng trong Database`,
            };
        }
    } catch (error) {
        console.log('An error in handleUpdateUserInformation() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `Không kết nối được với Database`,
        };
    }
};

// =================================================================
// CRUD PRODUCT LIST

// CREATE PRODUCT
export const handleCreateProduct = async (data) => {
    try {
        const { userId } = data;

        await db.Technology.create({
            type: 'PRODUCTDESC',
            key: 'PD',
            userId: userId,
        });

        return {
            errorCode: 0,
            errorMessage: `Tạo mới sản phẩm thành công`,
        };
    } catch (error) {
        console.log('An error in handleCreateProduct() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `Không kết nối được với Database`,
        };
    }
};

// READ PRODUCT LIST
export const handleGetProductList = async (data) => {
    try {
        const { userId } = data;

        const user = await db.User.findOne({
            where: { id: userId },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        });

        if (user) {
            const productIDs = await db.Technology.findAll({
                where: { userId: userId, key: 'PD' },
                attributes: ['id'],
            });
            const productIDArr = productIDs?.map((productID) => productID.id);
            const productIDArrWithNULL = productIDArr?.filter((productID) => productID !== null);

            if (productIDArrWithNULL.length > 0) {
                const uniqueProductIDArr = [...new Set(productIDArrWithNULL)]?.sort();

                let productListData = [];
                for (let productID of uniqueProductIDArr) {
                    const product = {
                        productInfo: {},
                        sourceCodeList: [],
                        FETechnologyList: [],
                        BETechnologyList: [],
                        FELibraryList: [],
                        numberofFELibrary: undefined,
                        BELibraryList: [],
                        numberofBELibrary: undefined,
                    };

                    const productDesc = await db.Technology.findOne({
                        where: { id: productID, key: 'PD' },
                        attributes: ['id', 'name', 'desc', 'image'],
                    });

                    if (productDesc) {
                        product.productInfo = productDesc;
                    }

                    const sourceCodes = await db.Technology.findAll({
                        where: { userId: userId, productId: productID, key: 'SC' },
                        attributes: ['id', 'image', 'name', 'link'],
                    });

                    if (sourceCodes) {
                        product.sourceCodeList = sourceCodes;
                    }

                    const FETechnologies = await db.Technology.findAll({
                        where: { userId: userId, productId: productID, key: 'TE', side: 'FE' },
                        attributes: ['id', 'image', 'name', 'link'],
                    });

                    if (FETechnologies) {
                        product.FETechnologyList = FETechnologies;
                    }

                    const BETechnologies = await db.Technology.findAll({
                        where: { userId: userId, productId: productID, key: 'TE', side: 'BE' },
                        attributes: ['id', 'image', 'name', 'link'],
                    });

                    if (BETechnologies) {
                        product.BETechnologyList = BETechnologies;
                    }

                    const FELibraries = await db.Technology.findAndCountAll({
                        where: { userId: userId, productId: productID, key: 'LI', side: 'FE' },
                        attributes: ['id', 'image', 'name', 'version', 'link'],
                    });
                    product.FELibraryList = FELibraries.rows;
                    product.numberofFELibrary = FELibraries.count;

                    const BELibraries = await db.Technology.findAndCountAll({
                        where: { userId: userId, productId: productID, key: 'LI', side: 'BE' },
                        attributes: ['id', 'image', 'name', 'version', 'link'],
                    });
                    product.BELibraryList = BELibraries.rows;
                    product.numberofBELibrary = BELibraries.count;

                    productListData.push(product);
                }

                return {
                    errorCode: 0,
                    errorMessage: `Tải danh sách sản phẩm thành công`,
                    data: productListData,
                };
            } else {
                return {
                    errorCode: 33,
                    errorMessage: `Không tìm thấy danh sách sản phẩm`,
                };
            }
        } else {
            return {
                errorCode: 32,
                errorMessage: `Không tìm thấy thông tin người dùng`,
            };
        }
    } catch (error) {
        console.log('An error in handleGetProductList() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `Không kết nối được với Database`,
        };
    }
};

// DELETE PRODUCT
export const handleDeleteProduct = async (data) => {
    try {
        const { userId, productId } = data;

        const product = await db.Technology.findOne({
            where: { id: productId, userId: userId },
        });

        if (product) {
            await db.Technology.destroy({ where: { id: productId } });
            await db.Technology.destroy({ where: { productId: productId } });

            return {
                errorCode: 0,
                errorMessage: `Xóa dự án thành công`,
            };
        } else {
            return {
                errorCode: 32,
                errorMessage: `Không tìm thấy dự án`,
            };
        }
    } catch (error) {
        console.log('An error in handleDeleteProduct() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `Không kết nối được với Database`,
        };
    }
};
