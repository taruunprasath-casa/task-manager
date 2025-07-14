import express from "express";
import TaskController from "../controllers/TaskController";
import taskCommentRouter from "./TaskComments";

const router = express.Router();

router.post("/", TaskController.createTask);
router.post("/list", TaskController.getAllTask);
router.get("/:id", TaskController.getTaskById);
router.put("/:id", TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);
router.use("/",taskCommentRouter);
export default router;
