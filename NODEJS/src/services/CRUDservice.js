
import bcrypt from 'bcryptjs';
import db from '../models/index';
import { raw } from 'body-parser';
var salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.Password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.FirstName,
                lastName: data.LastName,
                address: data.Address,
                phonemunber: data.PhoneNumber,
                gender: data.Gender === "1" ? true : false,
                roleId: data.roleId,
            })
            resolve("success");
        } catch (error) {
            reject(error);
        }
        
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
        
    })
}

let getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
}

let getUserByInfo = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: userId,
                },
                raw: true,
            });
            if (user) {
                resolve(user);
            } else {
                resolve({});
            }
            
        } catch (error) {
            reject(error);
        }
    })
}

let updateUserCRUD = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let user = await db.User.findOne({
                where: {
                    id: data.id,
                },
            })

            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();

                resolve("success");
            } else {
                resolve("User not found");
            }
            
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    createNewUser: createNewUser,
    getAllUsers: getAllUsers,
    getUserByInfo: getUserByInfo,
    updateUserCRUD: updateUserCRUD,
}