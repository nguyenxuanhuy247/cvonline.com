import db from '~/models';
import bcrypt from 'bcryptjs';
require('dotenv').config();
import jwt from 'jsonwebtoken';
const { Op } = require('sequelize');

const salt = bcrypt.genSaltSync(10);

// =================================================================

const getUserInfo = async (isEmail, input) => {
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
            errorMessage: `Tải thông tin ứng viên thành công`,
            data: newUser,
        };
    } else {
        return {
            errorCode: 32,
            errorMessage: `Người dùng không tồn tại trong hệ thống`,
        };
    }
};

const getProductList = async (userId) => {
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
            errorCode: 33,
            errorMessage: `Không tìm thấy danh sách sản phẩm`,
        };
    }
};

const updateProductList = async (userId) => {
    const getProductListMessage = await getProductList(userId);

    if (getProductListMessage.errorCode === 0) {
        return {
            errorCode: 32,
            errorMessage: `Sản phẩm không còn tồn tại. Đã cập nhật lại danh sách sản phẩm.`,
            data: getProductListMessage.data,
        };
    } else {
        return {
            errorCode: 32,
            errorMessage: `Sản phẩm không còn không tồn tại. Đã cập nhật lại danh sách sản phẩm.`,
            data: [],
        };
    }
};

// =================================================================

// HANDLE USER SIGNIN
export const postUserSignIn = async (data) => {
    try {
        const { email, password, fullName, isGoogle } = data;

        const user = await db.users.findOne({
            where: { email: email },
            attributes: ['id', 'avatar', 'fullName', 'email', 'password'],
            raw: true,
        });

        if (user) {
            const payload = { id: user.id, email: user.email };
            const key = process.env.ACCESS_TOKEN_SECRET;
            const token = jwt.sign(payload, key);

            if (!isGoogle) {
                if (user.password) {
                    const isPasswordMatch = await bcrypt.compareSync(password, user.password);

                    if (isPasswordMatch) {
                        try {
                            const message = await getUserInfo(true, email);
                            const { errorCode, data } = message;

                            if (errorCode === 0) {
                                return {
                                    errorCode: 0,
                                    errorMessage: `Đăng nhập bằng Email thành công`,
                                    data: data,
                                    token: token,
                                };
                            } else {
                                return message;
                            }
                        } catch (error) {
                            console.log(
                                'An error in Get User Info in postUserSignIn() by Email in userService.js : ',
                                error,
                            );

                            return {
                                errorCode: 31,
                                errorMessage: `Lỗi Server! Không thể đăng nhập bằng Email ☹️`,
                            };
                        }
                    } else {
                        return {
                            errorCode: 33,
                            errorMessage: `Sai mật khẩu`,
                        };
                    }
                } else {
                    return {
                        errorCode: 32,
                        errorMessage: `Chưa thiết lập mật khẩu. Hãy nhấn vào "Quên mật khẩu?"`,
                    };
                }
            } else {
                try {
                    const message = await getUserInfo(true, email);
                    const { errorCode, data } = message;

                    if (errorCode === 0) {
                        return {
                            errorCode: 0,
                            errorMessage: `Đăng nhập bằng Google thành công`,
                            data: data,
                            token: token,
                        };
                    } else {
                        return message;
                    }
                } catch (error) {
                    console.log('An error in Get User Info in postUserSignIn() in userService.js : ', error);

                    return {
                        errorCode: 31,
                        errorMessage: `Lỗi Server! Không thể đăng nhập bằng Google ☹️`,
                    };
                }
            }
        } else if (isGoogle) {
            try {
                await db.users.create({
                    email: email,
                    fullName: fullName,
                    jobPosition: 'Fullstack developer',
                });

                try {
                    const message = await getUserInfo(true, email);
                    const { errorCode, data } = message;

                    if (errorCode === 0) {
                        return {
                            errorCode: 0,
                            errorMessage: `Đăng ký tài khoản bằng Google thành công`,
                            data: data,
                        };
                    } else {
                        return message;
                    }
                } catch (error) {
                    console.log('An error in Get User Info in postUserSignIn() by Google in userService.js : ', error);

                    return {
                        errorCode: 31,
                        errorMessage: `Lỗi Server! Không thể đăng ký tài khoản bằng Google ☹️`,
                    };
                }
            } catch (error) {
                console.log('An error in Create New User in postUserSignIn() by Google in userService.js : ', error);

                return {
                    errorCode: 31,
                    errorMessage: `Lỗi Server! Không thể đăng ký tài khoản bằng Google ☹️`,
                };
            }
        } else {
            return {
                errorCode: 32,
                errorMessage: `Email này chưa đăng ký tài khoản`,
            };
        }
    } catch (error) {
        console.log('An error in postUserSignIn() in userService.js : ', error);

        return {
            errorCode: 31,
            errorMessage: `Lỗi Server! Không thể đăng nhập vào ứng dụng ☹️`,
        };
    }
};

// HANDLE USER SIGNUP
export const postUserSignUp = async (data) => {
    try {
        const { fullName, email, password } = data;

        const hashPassword = await bcrypt.hashSync(password, salt);

        if (hashPassword) {
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
                try {
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
                } catch (error) {
                    console.log('An error in Create New Product in postUserSignUp() in userService.js : ', error);

                    return {
                        errorCode: 31,
                        errorMessage: `Lỗi Server! Không thể đăng ký tài khoản ☹️`,
                    };
                }
            } else {
                return {
                    errorCode: 32,
                    errorMessage: `Email này đã được đăng ký`,
                };
            }
        }
    } catch (error) {
        console.log('An error in postUserSignUp() in userService.js : ', error);

        return {
            errorCode: 31,
            errorMessage: `Lỗi Server! Không thể đăng ký tài khoản ☹️`,
        };
    }
};

// HANDLE DELETE ACCOUNT
export const deleteAccount = async (data) => {
    try {
        const { userId } = data;

        await db.users.destroy({ where: { id: userId } });
        await db.technologies.destroy({ where: { userId: userId } });

        return {
            errorCode: 0,
            errorMessage: `Xóa tài khoản thành công`,
        };
    } catch (error) {
        console.log('An error in deleteAccount() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `Lỗi Server! Không thể xóa tài khoản ☹️`,
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
            const secret = process.env.ACCESS_TOKEN_SECRET + user.password;
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
            errorMessage: `Lỗi Server! Không thể đặt lại mật khẩu ☹️`,
        };
    } catch (error) {
        console.log('An error in handleGetResetPassword() in userService.js : ', error);

        return {
            errorCode: 31,
            errorMessage: `Lỗi Server! Không thể đặt lại mật khẩu ☹️`,
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
            const hashPassword = await bcrypt.hashSync(password, salt);

            user.password = hashPassword;
            await user.save();

            return {
                errorCode: 0,
            };
        }

        return {
            errorCode: 31,
            errorMessage: `Lỗi Server! Không thể đặt lại mật khẩu ☹️`,
        };
    } catch (error) {
        console.log('An error in handlePostResetPassword() in userService.js : ', error);

        return {
            errorCode: 31,
            errorMessage: `Lỗi Server! Không thể đặt lại mật khẩu ☹️`,
        };
    }
};

// =================================================================

// SEARCH PRODUCT
export const handleGetSearch = async (data) => {
    const { searchValue } = data;

    try {
        const technologies = await db.technologies.findAll({
            where: {
                type: 'PRODUCTDESC',
                name: {
                    [Op.iLike]: `%${searchValue}%`,
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
            errorMessage: `Lỗi Server! Không thể tìm kiếm sản phẩm ☹️`,
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
            errorMessage: `Lỗi Server! Không thể tải danh sách CV ☹️`,
        };
    }
};

// READ CV LAYOUT
export const handleGetCVLayout = async (userId) => {
    try {
        const getUserMessage = await getUserInfo(false, userId);

        if (getUserMessage.errorCode === 0) {
            const getProductListMessage = await getProductList(userId);

            if (getProductListMessage.errorCode === 0) {
                return {
                    errorCode: 0,
                    errorMessage: `Tải CV của ứng viên thành công`,
                    data: { userInfo: getUserMessage.data, productList: getProductListMessage.data },
                };
            } else {
                return { ...getProductListMessage, data: getUserMessage.data };
            }
        } else {
            return getUserMessage;
        }
    } catch (error) {
        console.log('An error in handleGetCVLayout() in userService.js : ', error);
        return {
            errorCode: 31,
            errorMessage: `Lỗi Server! Không thể tải CV của ứng viên ☹️`,
        };
    }
};

// =================================================================
// CRUD USER INFORMATION

// UPDATE USER INFORMATION
export const handleUpdateUserInformation = async (data) => {
    const { userId, label } = data;

    try {
        const newData = { ...data };

        const user = await db.users.findOne({
            where: { id: userId },
            raw: false,
        });

        const keyArray = Object.keys(await db.users.rawAttributes);

        if (user) {
            delete newData.userId;

            if (!newData.password) {
                for (let prop in newData) {
                    if (newData[prop] !== undefined) {
                        const isInArray = keyArray.includes(prop);
                        if (isInArray) {
                            user[prop] = newData[prop];
                        }
                    }
                }
            } else {
                const hashPassword = await bcrypt.hashSync(newData.password, salt);
                user.password = hashPassword;
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
            }
        }

        return {
            errorCode: 32,
            errorMessage: `Hồ sơ của bạn không còn tồn tại. Vui lòng đăng nhập lại ☹️`,
        };
    } catch (error) {
        console.log('An error in handleUpdateUserInformation() in userService.js : ', error);

        return {
            errorCode: 31,
            errorMessage: `Lỗi Server! Không thể cập nhật ${label} ☹️`,
        };
    }
};

// =================================================================
// CRUD PRODUCT LIST

// CREATE PRODUCT
export const handleCreateProduct = async (data) => {
    try {
        const { userId } = data;

        const user = await db.users.findOne({
            where: { id: userId },
            raw: false,
        });

        if (user) {
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

            const { id, name, desc, image, productOrder } = await db.technologies.create({
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
                productInfo: { id, name, desc, image: binaryImage, productOrder },
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
        } else {
            return {
                errorCode: 32,
                errorMessage: `Hồ sơ của bạn không còn tồn tại. Vui lòng đăng nhập lại ☹️`,
            };
        }
    } catch (error) {
        console.log('An error in handleCreateProduct() in userService.js : ', error);

        return {
            errorCode: 31,
            errorMessage: `Lỗi Server! Không thể tải sản phẩm mới ☹️`,
        };
    }
};

// UPDATE PRODUCT
export const handleUpdateProduct = async (data) => {
    const { userId, productId, label } = data;
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
            const getProductListMessage = await updateProductList(userId);
            return getProductListMessage;
        }
    } catch (error) {
        console.log('An error in handleUpdateProduct() in userService.js : ', error);

        return {
            errorCode: 31,
            errorMessage: `Lỗi Server! Không thể cập nhật ${label} ☹️`,
        };
    }
};

// DELETE PRODUCT
export const handleDeleteProduct = async (data) => {
    try {
        const { userId, productId } = data ?? {};

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
            const getProductListMessage = await updateProductList(userId);
            return getProductListMessage;
        }
    } catch (error) {
        console.log('An error in handleDeleteProduct() in userService.js : ', error);

        return {
            errorCode: 31,
            errorMessage: `Lỗi Server! Không thể xóa sản phẩm ☹️`,
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
            const getProductListMessage = await updateProductList(userId);
            return getProductListMessage;
        }
    } catch (error) {
        console.log('An error in handleMoveProduct() in userService.js : ', error);

        return {
            errorCode: 31,
            errorMessage: `Lỗi Server! Không thể di chuyển sản phẩm ☹️`,
        };
    }
};

// =================================================================
// CRUD TECHNOLOGY

const handleFindAllTechnologyList = async (data) => {
    const { type, key, side, userId, productId } = data ?? {};

    let findAllQuery;
    let dataSentToClient = {};

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

    return dataSentToClient;
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

            const dataSentToClient = await handleFindAllTechnologyList(data);

            return {
                errorCode: 0,
                errorMessage: `Tạo mới ${label} thành công`,
                data: dataSentToClient,
            };
        } else {
            return {
                errorCode: 33,
                errorMessage: `${label} này đã tồn tại`,
            };
        }
    } catch (error) {
        console.log('An error in handleCreateTechnology() in userService.js : ', error);

        return {
            errorCode: 31,
            errorMessage: `Lỗi Server! Không thể tạo mới ${label} ☹️`,
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

            const dataSentToClient = await handleFindAllTechnologyList(data);

            return {
                errorCode: 0,
                errorMessage: `Cập nhật ${label} thành công`,
                data: dataSentToClient,
            };
        } else {
            const dataSentToClient = await handleFindAllTechnologyList(data);

            return {
                errorCode: 32,
                errorMessage: `${label} này không còn tồn tại. Đã cập nhật lại danh sách.`,
                data: dataSentToClient,
            };
        }
    } catch (error) {
        console.log('An error in handleUpdateTechnology() in userService.js : ', error);

        return {
            errorCode: 31,
            errorMessage: `Lỗi Server! Không thể cập nhật ${label} ☹️`,
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

            const dataSentToClient = await handleFindAllTechnologyList(data);

            return {
                errorCode: 0,
                errorMessage: `Xóa ${label} thành công`,
                data: dataSentToClient,
            };
        } else {
            const dataSentToClient = await handleFindAllTechnologyList(data);

            return {
                errorCode: 32,
                errorMessage: `${label} này không còn tồn tại. Đã cập nhật lại danh sách.`,
                data: dataSentToClient,
            };
        }
    } catch (error) {
        console.log('An error in handleDeleteTechnology() in userService.js : ', error);

        return {
            errorCode: 31,
            errorMessage: `Lỗi Server! Không thể xóa ${label} ☹️`,
        };
    }
};

// DRAG AND DROP TECHNOLOGY
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

        const dataSentToClient = await handleFindAllTechnologyList(getData);

        return {
            errorCode: 0,
            errorMessage: `Sắp xếp danh sách ${label} thành công`,
            data: dataSentToClient,
        };
    } catch (error) {
        console.log('An error in handleUpdateMultipleTechnologies() in userService.js : ', error);

        return {
            errorCode: 31,
            errorMessage: `Lỗi Server! Không thể sắp xếp danh sách ${label} ☹️`,
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
            await db.technologies.update({ userId: newID }, { where: { userId: currentID } });

            return {
                errorCode: 0,
                errorMessage: `Cập nhật ID người dùng thành công`,
            };
        } else {
            return {
                errorCode: 32,
                errorMessage: `Hồ sơ của bạn không còn tồn tại. Vui lòng đăng nhập lại ☹️`,
            };
        }
    } catch (error) {
        console.log('An error in handleChangeUserID() in userService.js : ', error);

        return {
            errorCode: 31,
            errorMessage: `Lỗi Server! Không thể cập nhật ID người dùng ☹️`,
        };
    }
};
