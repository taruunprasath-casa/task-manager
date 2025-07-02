import { z } from "zod";

const name = z.string().min(1, { message: "Task Name can't be empty" });
const description = z
  .string()
  .min(1, { message: "Description can't be empty" });

const taskData = z.object({
  name: name,
  description: description,
  estimatedDate: z.coerce.date().optional(),
  repos: z
    .object({
      repoId: z.number(),
      branchName: z.string(),
    })
    .array()
    .optional(),
  users: z
    .object({
      userId: z.number(),
      roleId: z.number(),
    })
    .array(),
});

export default { taskData };
