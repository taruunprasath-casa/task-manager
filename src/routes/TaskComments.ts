import express from "express";
import TaskCommentController from "../controllers/TaskCommentController";
const router = express.Router();

router.post("/:taskid/comments", TaskCommentController.createTaskComments);

export default router;
