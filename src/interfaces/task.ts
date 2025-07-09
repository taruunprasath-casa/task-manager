import { z } from "zod";
import task from "../validators/task";

export type TaskData = z.infer<typeof task.taskData>;
export type TaskFilters = z.infer<typeof task.taskFilters>;
export interface TaskUpdateData {
  id: number;
  name: string;
  description: string;
  stage_id: number;
}
export interface TaskRepoData {
  task_id: number;
  repo_id: number;
  task_branch_name: string;
}
