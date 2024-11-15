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

module.exports = {
    handleLogin: handleLogin,
};