import { z } from "zod";

const name = z.string().min(1, { message: "Task Name can't be empty" });
const description = z
  .string()
  .min(1, { message: "Description can't be empty" });
const taskRepo = z
    .object({
      repoId: z.number(),
      branchName: z.string(),
    })
const taskData = z.object({
  name: name,
  description: description,
  estimatedDate: z.coerce.date().optional(),
  stageId:z.number(),
  repos: taskRepo
    .array()
    .optional(),
  users: z
    .object({
      userId: z.number(),
      roleId: z.number(),
    })
    .array(),     
});

const taskFilter = z.object({
  userIds: z.number().array().optional(),
  fromEstimatedDate: z.coerce.date().optional(),
  toEstimatedDate: z.coerce.date().optional(),
}); 



export default { taskData, taskFilter, taskRepo};  
