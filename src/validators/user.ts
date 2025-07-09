import { z } from "zod";

const userData = z.object({
  name:z.string().min(1,{message:"User Name cannot be empty"})  
});
const userTaskData = z.object({
  task_id: z.number(),
  user_id: z.number(),
  role_id: z.number(),
})

export default {userData,userTaskData}
