import router from ".";
import { UserController } from "../controllers/UserController";
import localDatabase from "../database";

const userController = new UserController(localDatabase)

router.post('/user/', userController.create)