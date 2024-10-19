import express from 'express';
import HomeController from '../controllers/HomeController';

let router = express.Router();

let initWebRouter = (app) => {
    router.get('/', HomeController.getHomePage);
    router.get('/about', HomeController.getAboutPage);
    return app.use("/", router);
}

module.exports = initWebRouter;