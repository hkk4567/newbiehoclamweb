import db from '../models/index';
import CRUDservice from '../services/CRUDservice';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs',{
            data: JSON.stringify(data)
        });
    } catch (error) {
        console.error(error);
    }
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = await CRUDservice.createNewUser(req.body);
    console.log(message);
    return res.send('post CRUD');
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUsers();
    console.log("--------------------------------");
    console.log(data);
    console.log("--------------------------------");
    return res.render('display-crud.ejs', {
        data: data,
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDservice.getUserByInfo(userId);


        return res.render('editCRUD.ejs', {userData: userData});
    } else {
        return res.send("sai rồi đm =))");
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDservice.updateUserCRUD(data);

    return res.render('display-crud.ejs', {
        data: allUsers,
    });
}

module.exports = {
    getAboutPage: getAboutPage,
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
}
