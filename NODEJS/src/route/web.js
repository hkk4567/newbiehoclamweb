import express from 'express';
import HomeController from '../controllers/homeController';
import UserController from '../controllers/userController';

let router = express.Router();

let initWebRouter = (app) => {
    router.get('/', HomeController.getHomePage);
    router.get('/about', HomeController.getAboutPage);
    router.get('/CRUD', HomeController.getCRUD);
    
    router.post('/post-crud', HomeController.postCRUD);
    router.get('/get-crud', HomeController.displayGetCRUD);
    router.get('/edit-crud', HomeController.getEditCRUD);

    router.post('/put-crud', HomeController.putCRUD);
    router.get('/delete-crud', HomeController.deleteCRUD);

    router.post('/api/login', UserController.handleLogin);
    router.get('/api/get-all-user', UserController.handleGetAllUser);

    return app.use("/", router);
}

module.exports = initWebRouter;