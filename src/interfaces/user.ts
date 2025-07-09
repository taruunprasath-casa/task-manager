import { z } from "zod";
import user from "../validators/user";

export type UserData = z.infer<typeof user.userData>
export type UserTaskData = z.infer<typeof user.userTaskData>