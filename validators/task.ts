import {z} from "zod"

const name =z.string().min(1,{message:"Field can't be empty"})

const taskData = z.object({
    taskname:name
});

export default {taskData};

