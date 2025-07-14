import { z } from "zod";
import taskCommentData from "../validators/taskComments";

export type TaskCommentData = z.infer<typeof taskCommentData>