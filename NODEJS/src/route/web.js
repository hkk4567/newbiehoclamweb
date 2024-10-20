import express from 'express';
import HomeController from '../controllers/homeController';

let router = express.Router();

let initWebRouter = (app) => {
    router.get('/', HomeController.getHomePage);
    router.get('/about', HomeController.getAboutPage);
    router.get('/CRUD', HomeController.getCRUD);
    
    router.post('/post-crud', HomeController.postCRUD);
    return app.use("/", router);
}

module.exports = initWebRouter;