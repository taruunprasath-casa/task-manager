import { z } from "zod";

const taskCommentData = z.object({
    userId:z.number(),
    taskUpdates:z.string()
})

export default taskCommentData;