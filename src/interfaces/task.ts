import { z } from "zod";
import task from "../validators/task";

export type TaskData = z.infer<typeof task.taskData>
export type TaskFilters = z.infer<typeof task.taskFilters>