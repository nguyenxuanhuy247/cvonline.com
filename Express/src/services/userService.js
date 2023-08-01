import db from '~/models';
import bcrypt from 'bcryptjs';

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
            let user = await db.users.findOne({
                where: { email: email },
                attributes: ['id', 'avatar', 'fullName', 'email', 'password'],
                raw: true,
            });

            if (user) {
                let newUser;

                // Convert avatar to Base64
                const avatar = user.avatar;
                const binaryAvatar = avatar?.toString('binary');
                newUser = { ...user, avatar: binaryAvatar };

                if (!isGoogle) {
                    if (user.password) {
                        let isPasswordMatch = await bcrypt.compareSync(password, user.password);

                        if (isPasswordMatch) {
                            newUser.isPassword = !!user.password;

                            delete newUser.password;
                            return {
                                errorCode: 0,
                                errorMessage: `Đăng nhập với Email thành công`,
                                data: newUser,
                            };
                        } else {
                            return {
                                errorCode: 34,
                                errorMessage: `Mật khẩu không chính xác`,
                            };
                        }
                    } else {
                        return {
                            errorCode: 33,
                            errorMessage: `Đăng nhập bằng Google để thiết lập mật khẩu`,
                        };
                    }
                } else {
                    newUser.isPassword = !!user.password;
                    delete newUser.password;

                    return {
                        errorCode: 0,
                        errorMessage: `Đăng nhập với tài khoản Google thành công`,
                        data: newUser,
                    };
                }
            } else {
                return {
                    errorCode: 32,
                    errorMessage: `Email không tồn tại trong hệ thống`,
                };
            }
        } else if (errorCode === 32) {
            await db.users.create({
                email: email,
                fullName: fullName,
            });

            return {
                errorCode: 0,
                errorMessage: `Đăng ký tài khoản với Google thành công`,
            };
        } else if (errorCode === 31) {
            return {
                errorCode: 31,
                errorMessage: errorMessage,
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
// CRUD USER INFORMATION

// READ USER INFORMATION
export const handleGetUserInformation = async (data) => {
    try {
        const { userId } = data;

        let user = await db.users.findOne({
            where: { id: userId },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            raw: true,
        });

        if (user) {
            const avatar = user.avatar;
            const password = user.password;

            const binaryAvatar = avatar?.toString('binary');
            const newUser = { ...user, avatar: binaryAvatar, isPassword: !!password };
            delete newUser.password;

            return {
                errorCode: 0,
                errorMessage: `Tải thông tin người dùng thành công`,
                data: newUser,
            };
        } else {
            return {
                errorCode: 32,
                errorMessage: `[Không tìm thấy user ID] Tải thông tin người dùng thất bại`,
            };
        }
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
    const { userId, label } = data;

    try {
        const user = await db.users.findOne({
            where: { id: userId },
            raw: false,
        });

        const keyArray = Object.keys(await db.users.rawAttributes);

        if (user) {
            const newData = { ...data };
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

            return {
                errorCode: 0,
                errorMessage: `Cập nhật ${label} thành công`,
            };
        } else {
            return {
                errorCode: 32,
                errorMessage: `[Không tìm thấy user ID] Cập nhật ${label} thất bại`,
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

        if (productIDs) {
            const productIDArr = productIDs?.map((productID) => productID.productOrder);
            const productIDArrWithNULL = productIDArr?.filter((productID) => productID !== null);
            let maxOrder = Math.max(...productIDArrWithNULL);

            if (maxOrder !== 0) {
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
            } else {
                return {
                    errorCode: 33,
                    errorMessage: `Không tìm thấy danh sách sản phẩm đã tạo`,
                };
            }
        } else {
            return {
                errorCode: 32,
                errorMessage: `Không tìm thấy danh sách sản phẩm đã tạo`,
            };
        }
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

        const user = await db.users.findOne({
            where: { id: userId },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
            raw: true,
        });

        if (user) {
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
                        attributes: ['id', 'image', 'name', 'link'],
                        order: [['id', 'ASC']],
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
                        attributes: ['id', 'image', 'name', 'link'],
                        order: [['id', 'ASC']],
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
                        attributes: ['id', 'image', 'name', 'link'],
                        order: [['id', 'ASC']],
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
                        attributes: ['id', 'image', 'name', 'version', 'link'],
                        order: [['id', 'ASC']],
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
                        attributes: ['id', 'image', 'name', 'version', 'link'],
                        order: [['id', 'ASC']],
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
        } else {
            return {
                errorCode: 32,
                errorMessage: `Không tìm thấy ID người dùng để tải danh sách sản phẩm`,
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
    console.log('DATA', data);
    const { key, type, side, name, userId, productId, label } = data ?? {};

    let findAllQuery;
    if (type === 'SOURCECODE') {
        findAllQuery = { key: key, userId: userId, productId: productId };
    } else {
        findAllQuery = { side: side, key: key, userId: userId, productId: productId };
    }

    const { rows, count } = await db.technologies.findAndCountAll({
        where: findAllQuery,
        attributes: ['id', 'image', 'name', 'version', 'link'],
        order: [['id', 'ASC']],
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
};

// CREATE TECHNOLOGY
export const handleCreateTechnology = async (data) => {
    const { key, type, side, name, userId, productId, label } = data ?? {};

    try {
        let whereQuery;
        if (type === 'SOURCECODE') {
            whereQuery = { name: name, userId: userId, productId: productId };
        } else {
            whereQuery = { side: side, name: name, userId: userId, productId: productId };
        }

        const technology = await db.technologies.findOne({
            where: whereQuery,
            attributes: ['name'],
            raw: true,
        });

        if (!technology || technology.name !== name) {
            const queryData = { ...data };
            delete queryData?.label;
            await db.technologies.create({ ...queryData });

            const message = handleFindAllTechnologyList(data, 'Tạo');

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
        const result = await db.technologies.findOne({
            where: { id: id },
            raw: false,
        });

        if (result) {
            result.image = image;
            result.name = name;
            result.version = version;
            result.link = link;

            await result.save();

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

// DELETE TECHNOLOGY
export const handleDeleteTechnology = async (data) => {
    const { key, type, side, technologyId, userId, productId, label } = data ?? {};

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
