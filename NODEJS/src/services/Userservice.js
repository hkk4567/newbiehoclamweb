import { RAW } from "sequelize/lib/query-types";
import db from "../models/index";
import bcrypt from 'bcryptjs';

let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                        where: {
                            email: email,
                        },
                        attributes: ['email', 'password', 'roleId'],
                        raw: true,
                });

                if (user) {
                    let match = await bcrypt.compare(password, user.password);
                    if (match) {
                        userData.errCode = 0;
                        userData.errMsg = "";

                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMsg = "Sai mật khẩu.";
                    }
                } else {
                        userData.errCode = 2;
                        userData.errMsg = "khong tim thay nguoi dung";
                }
                resolve(userData);
            } else {
                userData.errCode = 1;
                userData.errMsg = "Tài khoản không tồn tại.";
                resolve(userData);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (email) => {
    return new Promise( async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                    where: {
                        email: email
                    }
            });
                
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise( async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: { exclude: ['password'] },
                });
            } else if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: {
                        id: userId
                    },
                    attributes: { exclude: ['password'] },
                });
            }
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
};