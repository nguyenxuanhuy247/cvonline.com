import db from '~/models';
import bcrypt from 'bcryptjs';
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const salt = bcrypt.genSaltSync(10);

// Email check function
const checkUserEmailInDB = async (email) => {
    try {
        let user = await db.users.findOne({
            where: { email: email },
            attributes: ['email'],
            raw: true,
        });

        if (user) {
            return {
                errorCode: 0,
                errorMessage: `Email hợp lệ`,
            };
        } else {
            return {
                errorCode: 32,
                errorMessage: `Email không tồn tại trong hệ thống`,
            };
        }
    } catch (error) {
        console.log('An error in checkUserEmailInDB() in userService.js : ', error);

        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] Xác thực email thất bại`,
        };
    }
};

// Hash password function
const hashUserPassword = async (password) => {
    try {
        let hashPassword = await bcrypt.hashSync(password, salt);

        return {
            errorCode: 0,
            errorMessage: `Mã hóa mật khẩu thành công`,
            hashPassword: hashPassword,
        };
    } catch (error) {
        console.log('An error in hashUserPassword() : ', error);

        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] Mã hóa mật khẩu thất bại`,
        };
    }
};

// Get user information
const getUserInfo = async (isEmail, input) => {
    try {
        let whereQuery;
        if (isEmail) {
            whereQuery = { email: input };
        } else {
            whereQuery = { id: input };
        }

        const user = await db.users.findOne({
            where: whereQuery,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            raw: true,
        });

        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', user);
        if (user) {
            const avatar = user.avatar;
            const binaryAvatar = avatar?.toString('binary');
            const newUser = {
                ...user,
                avatar: binaryAvatar,
                isPassword: !!user.password,
                isGmailPassword: !!user.gmailPassword,
            };

            delete newUser.password;
            delete newUser.gmailPassword;

            return {
                errorCode: 0,
                errorMessage: `Tải thông tin người dùng thành công`,
                data: newUser,
            };
        } else {
            return {
                errorCode: 32,
                errorMessage: `Không tìm thấy người dùng. Tải thông tin người dùng thất bại`,
            };
        }
    } catch (error) {
        console.log('An error in getUserInfo() in userService.js : ', error);

        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] Tải thông tin người dùng thất bại`,
        };
    }
};

// Update password
export const postChangePassword = async (data) => {
    try {
        const { userId, password } = data;

        const user = await db.users.findOne({
            where: { id: userId },
            raw: false,
        });

        if (user) {
            let userData = await db.users.findOne({
                where: { id: userId },
                attributes: ['password'],
                raw: true,
            });

            if (userData) {
                let isPasswordMatch = await bcrypt.compareSync(password, userData.password);

                if (!isPasswordMatch) {
                    const { errorCode, errorMessage, hashPassword } = await hashUserPassword(password);

                    if (errorCode === 0) {
                        user.password = hashPassword;
                        await user.save();

                        return {
                            errorCode: 0,
                            errorMessage: `Cập nhật Mật khẩu thành công`,
                        };
                    } else {
                        return {
                            errorCode: 34,
                            errorMessage: errorMessage,
                        };
                    }
                } else {
                    return {
                        errorCode: 33,
                        errorMessage: `Mật khẩu đã được sử dụng`,
                    };
                }
            }
        } else {
            return {
                errorCode: 32,
                errorMessage: `[Không tìm thấy user ID] Cập nhật Password thất bại`,
            };
        }
    } catch (error) {
        console.log('An error in postUserSignIn() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] Đăng nhập thất bại`,
        };
    }
};

// HANDLE RESET PASSWORD
export const handleGetResetPassword = async (id, token) => {
    try {
        const user = await db.users.findOne({
            where: { id: id },
            attributes: ['id', 'email', 'password'],
            raw: true,
        });

        if (user) {
            const JWT_SECRET = 'reset password';
            const secret = JWT_SECRET + user.password;
            const isVerified = jwt.verify(token, secret);

            if (isVerified) {
                return {
                    errorCode: 0,
                    data: isVerified,
                };
            }
        }

        return {
            errorCode: 31,
        };
    } catch (error) {
        console.log('An error in handleGetResetPassword() in userService.js : ', error);

        return {
            errorCode: 31,
        };
    }
};

export const handlePostResetPassword = async (id, password) => {
    try {
        const user = await db.users.findOne({
            where: { id: id },
            attributes: ['id', 'password'],
            raw: false,
        });

        if (user) {
            const { errorCode, errorMessage, hashPassword } = await hashUserPassword(password);

            if (errorCode === 0) {
                user.password = hashPassword;
                await user.save();

                return {
                    errorCode: 0,
                };
            }
        }

        return {
            errorCode: 31,
        };
    } catch (error) {
        console.log('An error in handlePostResetPassword() in userService.js : ', error);

        return {
            errorCode: 31,
        };
    }
};

// HANDLE USER SIGNUP
export const postUserSignUp = async (data) => {
    try {
        const { fullName, email, password } = data;

        const { errorCode, errorMessage, hashPassword } = await hashUserPassword(password);

        if (errorCode === 0) {
            const [user, created] = await db.users.findOrCreate({
                where: {
                    email: email,
                },
                defaults: {
                    fullName: fullName,
                    email: email,
                    password: hashPassword,
                    jobPosition: 'Fullstack developer',
                },
                raw: true,
            });

            if (created) {
                await db.technologies.create({
                    type: 'PRODUCTDESC',
                    key: 'PD',
                    userId: user.id,
                    productOrder: 1,
                });

                return {
                    errorCode: 0,
                    errorMessage: `Đăng ký tài khoản thành công`,
                };
            } else {
                return {
                    errorCode: 32,
                    errorMessage: `Địa chỉ email đã được sử dụng`,
                };
            }
        } else {
            return {
                errorCode: 31,
                errorMessage: errorMessage,
            };
        }
    } catch (error) {
        console.log('An error in postUserSignUp() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] Đăng ký tài khoản thất bại`,
        };
    }
};

// HANDLE USER SIGNIN
export const postUserSignIn = async (data) => {
    try {
        const { email, password, fullName, isGoogle } = data;

        // Use email to check whether the user exists
        const { errorCode, errorMessage } = await checkUserEmailInDB(email);

        if (errorCode === 0) {
            // Get user's data again prevent someone from deleting/changing data
            const user = await db.users.findOne({
                where: { email: email },
                attributes: ['id', 'avatar', 'fullName', 'email', 'password'],
                raw: true,
            });

            if (user) {
                if (!isGoogle) {
                    if (user.password) {
                        let isPasswordMatch = await bcrypt.compareSync(password, user.password);

                        if (isPasswordMatch) {
                            const message = await getUserInfo(true, email);
                            const { errorCode, data } = message;

                            if (errorCode === 0) {
                                return {
                                    errorCode: 0,
                                    errorMessage: `Đăng nhập với Email thành công`,
                                    data: data,
                                };
                            } else {
                                return message;
                            }
                        } else {
                            return {
                                errorCode: 34,
                                errorMessage: `Mật khẩu không chính xác`,
                            };
                        }
                    } else {
                        return {
                            errorCode: 32,
                            errorMessage: `Chưa thiết lập mật khẩu`,
                        };
                    }
                } else {
                    const message = await getUserInfo(true, email);
                    const { errorCode, data } = message;

                    if (errorCode === 0) {
                        return {
                            errorCode: 0,
                            errorMessage: `Đăng nhập với tài khoản Google thành công`,
                            data: data,
                        };
                    } else {
                        return message;
                    }
                }
            } else {
                return {
                    errorCode: 32,
                    errorMessage: `Email không tồn tại trong hệ thống`,
                };
            }
        } else if (errorCode === 32 && isGoogle) {
            await db.users.create({
                email: email,
                fullName: fullName,
                jobPosition: 'Fullstack developer',
            });

            const message = await getUserInfo(true, email);
            const { errorCode, data } = message;

            if (errorCode === 0) {
                return {
                    errorCode: 0,
                    errorMessage: `Đăng ký tài khoản với Google thành công`,
                    data: data,
                };
            } else {
                return message;
            }
        } else if (errorCode === 31) {
            return {
                errorCode: 31,
                errorMessage: errorMessage,
            };
        } else {
            return {
                errorCode: 34,
                errorMessage: `Bạn chưa đăng ký tài khoản`,
            };
        }
    } catch (error) {
        console.log('An error in postUserSignIn() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] Đăng nhập thất bại`,
        };
    }
};

// =================================================================

// UPDATE USER INFORMATION
export const handleGetSearch = async (data) => {
    const { searchValue } = data;

    try {
        const technologies = await db.technologies.findAll({
            where: {
                type: 'PRODUCTDESC',
                name: {
                    [Op.substring]: searchValue,
                },
            },
            attributes: ['id', 'name', 'image'],
            include: [{ model: db.users, attributes: ['id', 'fullName', 'jobPosition'] }],
            raw: true,
            nest: true,
        });

        if (technologies.length > 0) {
            const newSearchResult = technologies.map((library) => {
                const binaryImage = library?.image?.toString('binary');
                return { ...library, image: binaryImage };
            });

            return {
                errorCode: 0,
                errorMessage: `Tìm kiếm sản phẩm thành công`,
                data: newSearchResult,
            };
        } else {
            return {
                errorCode: 32,
                errorMessage: `Không tìm thấy sản phẩm nào`,
            };
        }
    } catch (error) {
        console.log('An error in handleGetSearch() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] Tìm kiếm sản phẩm thất bại`,
        };
    }
};

// READ HOME LAYOUT
export const handleGetHomeLayout = async () => {
    try {
        let allCVList = [];
        const userIDList = await db.users.findAll({
            attributes: ['id'],
            order: [['id', 'ASC']],
            raw: true,
        });

        if (userIDList.length) {
            const userIDArray = userIDList?.map((userID) => userID.id);
            const userIDArrayWithNULL = userIDArray?.filter((userID) => userID !== null);
            const uniqueUserIDArray = [...new Set(userIDArrayWithNULL)];

            for (let userID of uniqueUserIDArray) {
                const userCV = {
                    userInfo: {},
                    numberofProduct: undefined,
                    FETechnologyList: [],
                    BETechnologyList: [],
                };

                const userInfo = await db.users.findOne({
                    where: { id: userID },
                    attributes: ['id', 'avatar', 'fullName', 'jobPosition'],
                    raw: true,
                });

                if (userInfo) {
                    const avatar = userInfo.avatar;
                    let binaryImage;
                    if (avatar) {
                        binaryImage = avatar.toString('binary');
                    }

                    const newUserInfo = { ...userInfo, avatar: binaryImage };
                    userCV.userInfo = newUserInfo;
                }

                const productList = await db.technologies.findAll({
                    where: { userId: userID, key: 'PD' },
                    attributes: ['id'],
                    raw: true,
                });

                if (productList.length) {
                    userCV.numberofProduct = productList.length;
                }

                const FETechnologies = await db.technologies.findAll({
                    where: { userId: userID, key: 'TE', side: 'FE' },
                    attributes: ['id', 'image', 'name'],
                    order: [['id', 'ASC']],
                    raw: true,
                });

                const FETechnologyList = FETechnologies?.map((FETechnology) => {
                    const binaryImage = FETechnology?.image?.toString('binary');
                    return { ...FETechnology, image: binaryImage };
                });

                userCV.FETechnologyList = FETechnologyList;

                const BETechnologies = await db.technologies.findAll({
                    where: { userId: userID, key: 'TE', side: 'BE' },
                    attributes: ['id', 'image', 'name'],
                    order: [['id', 'ASC']],
                    raw: true,
                });

                const BETechnologyList = BETechnologies?.map((BETechnology) => {
                    const binaryImage = BETechnology?.image?.toString('binary');
                    return { ...BETechnology, image: binaryImage };
                });

                userCV.BETechnologyList = BETechnologyList;

                allCVList.push(userCV);
            }

            return {
                errorCode: 0,
                errorMessage: `Tải Danh sách CV thành công`,
                data: allCVList,
            };
        } else {
            return {
                errorCode: 32,
                errorMessage: `Không tìm thấy CV nào`,
            };
        }
    } catch (error) {
        console.log('An error in handleGetHomeLayout() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] Danh sách CV thất bại`,
        };
    }
};

// =================================================================
// CRUD USER INFORMATION

// READ USER INFORMATION
export const handleGetUserInformation = async (data) => {
    try {
        const { userId } = data;
        const message = await getUserInfo(false, userId);

        return message;
    } catch (error) {
        console.log('An error in handleGetUserInformation() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] Tải thông tin người dùng thất bại`,
        };
    }
};

// UPDATE USER INFORMATION
export const handleUpdateUserInformation = async (data) => {
    try {
        const { userId, label } = data;
        const newData = { ...data };

        const user = await db.users.findOne({
            where: { id: userId },
            raw: false,
        });

        const keyArray = Object.keys(await db.users.rawAttributes);

        if (user) {
            delete newData.userId;

            for (let prop in newData) {
                if (newData[prop] !== undefined) {
                    const isInArray = keyArray.includes(prop);
                    if (isInArray) {
                        user[prop] = newData[prop];
                    }
                }
            }
            await user.save();

            const message = await getUserInfo(false, userId);
            const { errorCode, data } = message;

            if (errorCode === 0) {
                return {
                    errorCode: 0,
                    errorMessage: `Cập nhật ${label} thành công`,
                    data: data,
                };
            } else {
                return message;
            }
        } else {
            return {
                errorCode: 32,
                errorMessage: `Người dùng không tồn tại. Cập nhật ${label} thất bại`,
            };
        }
    } catch (error) {
        console.log('An error in handleUpdateUserInformation() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] Cập nhật ${label} thất bại`,
        };
    }
};

// =================================================================
// CRUD PRODUCT LIST

// CREATE PRODUCT
export const handleCreateProduct = async (data) => {
    try {
        const { userId } = data;

        const productIDs = await db.technologies.findAll({
            where: { userId: userId, key: 'PD' },
            attributes: ['productOrder'],
            raw: true,
        });

        const productIDArr = productIDs?.map((productID) => productID.productOrder);
        const productIDArrWithNULL = productIDArr?.filter((productID) => productID !== null);
        let maxOrder = 0;
        if (productIDArrWithNULL?.length > 0) {
            maxOrder = Math.max(...productIDArrWithNULL);
        }

        const { id, name, desc, image } = await db.technologies.create({
            type: 'PRODUCTDESC',
            key: 'PD',
            userId: userId,
            productOrder: maxOrder + 1,
        });

        let binaryImage;
        if (image) {
            binaryImage = image.toString('binary');
        }

        const newProduct = {
            order: undefined,
            productInfo: { id, name, desc, image: binaryImage },
            sourceCodeList: [],
            FETechnologyList: [],
            BETechnologyList: [],
            FELibraryList: [],
            numberofFELibrary: 0,
            BELibraryList: [],
            numberofBELibrary: 0,
        };

        return {
            errorCode: 0,
            errorMessage: `Tạo sản phẩm mới thành công`,
            data: newProduct,
        };
    } catch (error) {
        console.log('An error in handleCreateProduct() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] Tạo sản phẩm mới thất bại`,
        };
    }
};

// READ PRODUCT
export const handleGetProduct = async (data) => {
    try {
        const { userId } = data;

        const productIDs = await db.technologies.findAll({
            where: { userId: userId, key: 'PD' },
            attributes: ['id'],
            order: [['productOrder', 'ASC']],
            raw: true,
        });

        const productIDArr = productIDs?.map((productID) => productID.id);
        const productIDArrWithNULL = productIDArr?.filter((productID) => productID !== null);
        const uniqueProductIDArr = [...new Set(productIDArrWithNULL)];

        if (uniqueProductIDArr.length > 0) {
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

                const productDesc = await db.technologies.findOne({
                    where: { id: productID, key: 'PD' },
                    attributes: ['id', 'name', 'desc', 'image', 'productOrder'],
                    raw: true,
                });

                if (productDesc) {
                    const productImage = productDesc.image;
                    let binaryImage;
                    if (productImage) {
                        binaryImage = productImage.toString('binary');
                    }

                    const newProductDesc = { ...productDesc, image: binaryImage };

                    product.productInfo = newProductDesc;
                }

                const sourceCodes = await db.technologies.findAll({
                    where: { userId: userId, productId: productID, key: 'SC' },
                    attributes: ['id', 'image', 'name', 'link', 'technologyOrder'],
                    order: [['technologyOrder', 'ASC']],
                    raw: true,
                });

                if (sourceCodes) {
                    const sourceCodeList = sourceCodes.map((sourceCode) => {
                        const binaryImage = sourceCode?.image?.toString('binary');
                        return { ...sourceCode, image: binaryImage };
                    });

                    product.sourceCodeList = sourceCodeList;
                }

                const FETechnologies = await db.technologies.findAll({
                    where: { userId: userId, productId: productID, key: 'TE', side: 'FE' },
                    attributes: ['id', 'image', 'name', 'link', 'technologyOrder'],
                    order: [['technologyOrder', 'ASC']],
                    raw: true,
                });

                if (FETechnologies) {
                    const FETechnologyList = FETechnologies.map((FETechnology) => {
                        const binaryImage = FETechnology?.image?.toString('binary');
                        return { ...FETechnology, image: binaryImage };
                    });

                    product.FETechnologyList = FETechnologyList;
                }

                const BETechnologies = await db.technologies.findAll({
                    where: { userId: userId, productId: productID, key: 'TE', side: 'BE' },
                    attributes: ['id', 'image', 'name', 'link', 'technologyOrder'],
                    order: [['technologyOrder', 'ASC']],
                    raw: true,
                });

                if (BETechnologies) {
                    const BETechnologyList = BETechnologies.map((BETechnology) => {
                        const binaryImage = BETechnology?.image?.toString('binary');
                        return { ...BETechnology, image: binaryImage };
                    });

                    product.BETechnologyList = BETechnologyList;
                }

                const FELibraries = await db.technologies.findAndCountAll({
                    where: { userId: userId, productId: productID, key: 'LI', side: 'FE' },
                    attributes: ['id', 'image', 'name', 'version', 'link', 'technologyOrder'],
                    order: [['technologyOrder', 'ASC']],
                    raw: true,
                });

                if (FELibraries.rows.length > 0) {
                    const FELibraryList = FELibraries.rows.map((library) => {
                        const binaryImage = library?.image?.toString('binary');
                        return { ...library, image: binaryImage };
                    });

                    product.FELibraryList = FELibraryList;
                }
                product.numberofFELibrary = FELibraries.count;

                const BELibraries = await db.technologies.findAndCountAll({
                    where: { userId: userId, productId: productID, key: 'LI', side: 'BE' },
                    attributes: ['id', 'image', 'name', 'version', 'link', 'technologyOrder'],
                    order: [['technologyOrder', 'ASC']],
                    raw: true,
                });

                if (BELibraries.rows.length > 0) {
                    const FELibraryList = BELibraries.rows.map((library) => {
                        const binaryImage = library?.image?.toString('binary');
                        return { ...library, image: binaryImage };
                    });

                    product.BELibraryList = FELibraryList;
                }
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
                errorCode: 32,
                errorMessage: `Không tìm thấy danh sách sản phẩm`,
            };
        }
    } catch (error) {
        console.log('An error in handleGetProductList() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] Tải danh sách sản phẩm thất bại`,
        };
    }
};

// UPDATE PRODUCT
export const handleUpdateProduct = async (data) => {
    const { productId, label } = data;
    try {
        const product = await db.technologies.findOne({
            where: { id: productId },
            raw: false,
        });

        if (product) {
            const newData = { ...data };
            delete newData.productId;
            delete newData?.label;

            for (let prop in newData) {
                if (newData[prop] !== undefined) {
                    product[prop] = newData[prop];
                }
            }

            await product.save();

            return {
                errorCode: 0,
                errorMessage: `Cập nhật ${label} thành công`,
            };
        } else {
            return {
                errorCode: 32,
                errorMessage: `Không tìm thấy ${label}`,
            };
        }
    } catch (error) {
        console.log('An error in handleUpdateProduct() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] Cập nhật ${label} thất bại`,
        };
    }
};

// DELETE PRODUCT
export const handleDeleteProduct = async (data) => {
    try {
        const { productId } = data ?? {};

        const product = await db.technologies.findOne({
            where: { id: productId },
            raw: true,
        });

        if (product) {
            await db.technologies.destroy({ where: { id: productId } });
            await db.technologies.destroy({ where: { productId: productId } });

            return {
                errorCode: 0,
                errorMessage: `Xóa sản phẩm thành công`,
            };
        } else {
            return {
                errorCode: 32,
                errorMessage: `Không tìm thấy sản phẩm này`,
            };
        }
    } catch (error) {
        console.log('An error in handleDeleteProduct() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] Xóa sản phẩm thất bại`,
        };
    }
};

// MOVE PRODUCT
export const handleMoveProduct = async (data) => {
    const { movedItemID, movedItemOrder, siblingItemID, siblingItemOrder } = data;
    try {
        const movedProduct = await db.technologies.findOne({
            where: { id: movedItemID },
            raw: false,
        });

        const siblingProduct = await db.technologies.findOne({
            where: { id: siblingItemID },
            raw: false,
        });

        if (movedProduct && siblingProduct) {
            movedProduct.productOrder = movedItemOrder;
            siblingProduct.productOrder = siblingItemOrder;

            movedProduct.save();
            siblingProduct.save();

            return {
                errorCode: 0,
                errorMessage: `Di chuyển sản phẩm thành công`,
            };
        } else {
            return {
                errorCode: 32,
                errorMessage: `Không tìm thấy sản phẩm cần di chuyển`,
            };
        }
    } catch (error) {
        console.log('An error in handleMoveProduct() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] Di chuyển sản phẩm thất bại`,
        };
    }
};

// =================================================================
// CRUD TECHNOLOGY

const handleFindAllTechnologyList = async (data, CRUD) => {
    const { type, label, userId, productId, key, side } = data ?? {};

    try {
        let findAllQuery;
        if (type === 'SOURCECODE') {
            findAllQuery = { userId: userId, productId: productId, key: key };
        } else {
            findAllQuery = { userId: userId, productId: productId, key: key, side: side };
        }

        const { rows, count } = await db.technologies.findAndCountAll({
            where: findAllQuery,
            attributes: ['id', 'image', 'name', 'version', 'link', 'technologyOrder'],
            order: [['technologyOrder', 'ASC']],
            raw: true,
        });

        if (rows.length > 0) {
            let dataSentToClient = {};

            const technologyList = rows.map((library) => {
                const binaryImage = library?.image?.toString('binary');
                return { ...library, image: binaryImage };
            });

            if (type === 'SOURCECODE') {
                dataSentToClient.sourceCodeList = technologyList;
            } else if (type === 'TECHNOLOGY' && side === 'FE') {
                dataSentToClient.FETechnologyList = technologyList;
            } else if (type === 'TECHNOLOGY' && side === 'BE') {
                dataSentToClient.BETechnologyList = technologyList;
            } else if (type === 'LIBRARY' && side === 'FE') {
                dataSentToClient.FELibraryList = technologyList;
                dataSentToClient.numberofFELibrary = count;
            } else if (type === 'LIBRARY' && side === 'BE') {
                dataSentToClient.BELibraryList = technologyList;
                dataSentToClient.numberofBELibrary = count;
            }

            console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAA', dataSentToClient);
            return {
                errorCode: 0,
                errorMessage: `${CRUD} ${label} thành công`,
                data: dataSentToClient,
            };
        } else {
            return {
                errorCode: 33,
                errorMessage: `Không tìm thấy danh sách ${label}`,
            };
        }
    } catch (error) {
        console.log('An error in handleFindAllTechnologyList() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] Tải danh sách khi ${CRUD} ${label} thất bại`,
        };
    }
};

// CREATE TECHNOLOGY
export const handleCreateTechnology = async (data) => {
    const { key, type, side, name, userId, productId, label } = data ?? {};

    try {
        let whereQuery;
        if (type === 'SOURCECODE') {
            whereQuery = { userId: userId, productId: productId, key: key, name: name };
        } else {
            whereQuery = { userId: userId, productId: productId, key: key, side: side, name: name };
        }

        const technology = await db.technologies.findOne({
            where: whereQuery,
            attributes: ['name'],
            raw: true,
        });

        if (!technology) {
            delete whereQuery.name;

            const technologyIDs = await db.technologies.findAll({
                where: whereQuery,
                attributes: ['technologyOrder'],
                order: [['technologyOrder', 'ASC']],
                raw: true,
            });

            const technologyIDArr = technologyIDs?.map((technologyID) => technologyID.technologyOrder);
            const technologyIDArrWithNULL = technologyIDArr?.filter((technologyID) => technologyID !== null);
            const uniquetechnologyIDArr = [...new Set(technologyIDArrWithNULL)];

            let maxOrder = 0;
            if (uniquetechnologyIDArr?.length > 0) {
                maxOrder = Math.max(...uniquetechnologyIDArr);
            }

            const queryCreateTechnology = { ...data, technologyOrder: maxOrder + 1 };
            delete queryCreateTechnology.label;

            await db.technologies.create(queryCreateTechnology);

            const message = await handleFindAllTechnologyList(data, 'Tạo');

            return message;
        } else {
            return {
                errorCode: 32,
                errorMessage: `${label} này đã tồn tại`,
            };
        }
    } catch (error) {
        console.log('An error in handleCreateTechnology() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] Tạo mới ${label} thất bại`,
        };
    }
};

// UPDATE TECHNOLOGY
export const handleUpdateTechnology = async (data) => {
    const { id, image, name, version, link, label } = data ?? {};

    try {
        const technology = await db.technologies.findOne({
            where: { id: id },
            raw: false,
        });

        if (technology) {
            technology.image = image;
            technology.name = name;
            technology.version = version;
            technology.link = link;

            await technology.save();

            const message = await handleFindAllTechnologyList(data, 'Cập nhật');

            return message;
        } else {
            return {
                errorCode: 32,
                errorMessage: `Không tìm thấy ID để cập nhật ${label}`,
            };
        }
    } catch (error) {
        console.log('An error in handleUpdateTechnology() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] Cập nhật ${label} thất bại`,
        };
    }
};

export const handleUpdateMultipleTechnologies = async (data) => {
    const { updateData, getData } = data;
    const { label } = getData;

    try {
        for (let index in updateData) {
            const technology = updateData[index];

            await db.technologies.update(
                {
                    technologyOrder: technology.technologyOrder,
                },
                {
                    where: {
                        id: technology.technologyID,
                    },
                },
            );
        }

        const message = await handleFindAllTechnologyList(getData, '');

        return message;
    } catch (error) {
        console.log('An error in handleUpdateTechnology() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] Sắp xếp danh sách ${label} thất bại`,
        };
    }
};

// DELETE TECHNOLOGY
export const handleDeleteTechnology = async (data) => {
    const { technologyId, label } = data ?? {};

    try {
        const isExisted = await db.technologies.findOne({
            where: { id: technologyId },
        });

        if (isExisted) {
            await db.technologies.destroy({ where: { id: technologyId } });

            const message = await handleFindAllTechnologyList(data, 'Xóa');

            return message;
        } else {
            return {
                errorCode: 32,
                errorMessage: `Không tìm thấy ID để xóa ${label}`,
            };
        }
    } catch (error) {
        console.log('An error in handleDeleteTechnology() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] Xóa ${label} thất bại`,
        };
    }
};

// =================================================================================================
// CHANGE USER ID
export const handleChangeUserID = async (data) => {
    try {
        const { currentID, newID } = data;

        const user = await db.users.findOne({
            where: { id: currentID },
            attributes: ['id'],
            raw: true,
        });

        if (user) {
            await db.users.update({ id: newID }, { where: { id: currentID } });

            const changedUser = await db.users.findOne({
                where: { id: newID },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                raw: true,
            });

            if (changedUser) {
                const avatar = changedUser.avatar;
                const binaryAvatar = avatar?.toString('binary');
                const newUser = { ...changedUser, avatar: binaryAvatar, isPassword: !!changedUser.password };
                delete newUser.password;

                return {
                    errorCode: 0,
                    errorMessage: `Cập nhật ID người dùng thành công`,
                    data: newUser,
                };
            } else {
                return {
                    errorCode: 33,
                    errorMessage: `Không tìm thấy ID mới của người dùng`,
                };
            }
        } else {
            return {
                errorCode: 32,
                errorMessage: `Không tìm thấy ID của người dùng`,
            };
        }
    } catch (error) {
        console.log('An error in handleChangeUserID() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `[Kết nối Database] Cập nhật ID người dùng thất bại`,
        };
    }
};
