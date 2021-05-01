import { Router } from 'express';
import * as UserController from '../controller/user.controller';

const router = Router();

router.route("/signin")
.post(UserController.signin);

router.route("/signup")
.post(UserController.signup);

export default router;