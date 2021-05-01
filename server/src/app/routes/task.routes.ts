import { Router } from 'express';
import * as TaskController from '../controller/task.controller';
import { verifyToken } from '../controller/user.controller';

const router = Router();

router.route("/public/:userID")
.get(TaskController.getTasks)
.post(TaskController.postTask)
.delete(TaskController.deleteTasks);

router.route("/private/:userID")
.get(verifyToken, TaskController.getPrivateTasks)
.post(verifyToken, TaskController.postPrivateTask)
.delete(verifyToken, TaskController.deletePrivateTasks);

router.route("/:userID/:id")
.get(TaskController.getTask)
.put(TaskController.putTask)
.delete(TaskController.deleteTask);


export default router;