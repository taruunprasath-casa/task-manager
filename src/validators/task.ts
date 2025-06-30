import { z } from "zod";

const name = z.string().min(1, { message: "Task Name can't be empty" });
const description = z.string().min(1, { message: "Description can't be empty" });

const taskData = z.object({
  name: name,
  description: description,
  estimateDate: z.date().optional(),
  repo_id:z.number().optional()
});

export default { taskData };
