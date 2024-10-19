import db from '../models/index';

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

module.exports = {
    getAboutPage: getAboutPage,
    getHomePage: getHomePage,
}