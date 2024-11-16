import userservice from '../services/Userservice';
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password) {
        return res.status(500).json({
            errcode: 1,
            message: 'Email va password la bat buoc',
        });
    }

    let userData = await userservice.handleUserLogin(email, password);

    return res.status(200).json({
            errcode: userData.errCode,
            errMsg: userData.errMsg,
            user: userData.user ? userData.user : {}
    });
}

let handleGetAllUser = async (req, res) => {
    let id = req.body.id;
    let users = await userservice.getAllUsers(id);
    if (!id ) {
        return res.status(500).json({
            errCode: 1,
            errMsg: 'ID la bat buoc',
            users: [],
        });
    }
    return res.status(200).json({
        errCode: 0,
        errMsg: 'Success',
        users: users,
    });
};

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUser: handleGetAllUser,
};