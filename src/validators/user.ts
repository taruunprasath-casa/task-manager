import { z } from "zod";

const userData = z.object({
  name:z.string().min(1,{message:"User Name cannot be empty"})  
});

export default {userData}
