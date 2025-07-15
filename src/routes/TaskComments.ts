import express from "express";
import TaskCommentController from "../controllers/TaskCommentController";
const router = express.Router();

router.post("/:taskid/comments", TaskCommentController.createTaskComments);
router.get("/all/comments", TaskCommentController.getTaskComments);
router.get("/:taskid/comments", TaskCommentController.getTaskCommentsByTaskId);
router.put("/:taskid/comments/:commentid", TaskCommentController.updateTaskCommments);
router.delete(
  "/:taskid/comments/:commentid",
  TaskCommentController.deleteTaskComment
);
export default router;
