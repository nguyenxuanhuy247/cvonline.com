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
                productOrder: 1,
            });

            return {
                errorCode: 0,
                errorMessage: `Bạn vừa đăng ký tài khoản thành công`,
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
            errorMessage: `[Kết nối Database] Đăng ký thất bại`,
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
                        errorMessage: `Bạn vừa đăng nhập thành công`,
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
            return {
                errorCode: 32,
                errorMessage: `Email không tồn tại trên hệ thống`,
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

        let user = await db.User.findOne({
            where: { id: userId },
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        });

        if (user) {
            return {
                errorCode: 0,
                errorMessage: `Tải thông tin người dùng thành công`,
                data: user,
            };
        } else {
            return {
                errorCode: 32,
                errorMessage: `[Không tìm thấy ID] Tải thông tin người dùng thất bại`,
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
        const user = await db.User.findOne({
            where: { id: userId },
            raw: false,
        });

        const keyArray = Object.keys(await db.User.rawAttributes);

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
                errorMessage: `[Không tìm thấy ID] Cập nhật ${label} thất bại`,
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

        const productIDs = await db.Technology.findAll({
            where: { userId: userId, key: 'PD' },
            attributes: ['productOrder'],
        });

        if (productIDs) {
            const productIDArr = productIDs?.map((productID) => productID.productOrder);
            const productIDArrWithNULL = productIDArr?.filter((productID) => productID !== null);
            let maxOrder = Math.max(...productIDArrWithNULL);

            if (maxOrder !== 0) {
                await db.Technology.create({
                    type: 'PRODUCTDESC',
                    key: 'PD',
                    userId: userId,
                    productOrder: maxOrder + 1,
                });

                return {
                    errorCode: 0,
                    errorMessage: `Tạo sản phẩm mới thành công`,
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
                        order: undefined,
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
                        attributes: ['id', 'name', 'desc', 'image', 'productOrder'],
                    });

                    if (productDesc) {
                        product.productInfo = productDesc;
                        product.order = productDesc.productOrder;
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
    const { userId, productId, label } = data;
    try {
        const product = await db.Technology.findOne({
            where: { id: productId, userId: userId },
            raw: false,
        });

        if (product) {
            const newData = { ...data };
            delete newData.userId;
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
        const { userId, productId } = data ?? {};

        const product = await db.Technology.findOne({
            where: { id: productId, userId: userId },
        });

        if (product) {
            await db.Technology.destroy({ where: { id: productId } });
            await db.Technology.destroy({ where: { productId: productId } });

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

// =================================================================
// CRUD TECHNOLOGY

// CREATE TECHNOLOGY
export const handleCreateTechnology = async (data) => {
    const { type, side, name, userId, productId, label } = data ?? {};

    try {
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
            const queryData = { ...data };
            delete queryData?.label;

            await db.Technology.create({ ...queryData });

            return {
                errorCode: 0,
                errorMessage: `Tạo ${label} này thành công`,
            };
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
                errorMessage: `Cập nhật ${label} thành công`,
            };
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
    const { technologyId, label } = data;

    try {
        const isExisted = await db.Technology.findOne({
            where: { id: technologyId },
        });
        if (isExisted) {
            await db.Technology.destroy({ where: { id: technologyId } });

            return {
                errorCode: 0,
                errorMessage: `Xóa ${label} thành công`,
            };
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
