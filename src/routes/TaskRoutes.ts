import  express  from "express";
import TaskController from "../controllers/TaskController";
const router = express.Router();

router.post('/', TaskController.createTask);
router.post('/list', TaskController.getAllTask);
router.get('/:id', TaskController.getTaskById);
router.put('/:id', TaskController.updateTask);
router.delete('/:id',TaskController.deleteTask);


export default router;
