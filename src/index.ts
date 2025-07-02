
import express from "express";
import userRouter from "./routes/UserRoutes"; 
import taskRouter from "./routes/TaskRoutes";

const app = express();

app.use(express.json());

app.use("/users", userRouter); 
app.use("/tasks",taskRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/",(_req,res)=>{res.json({
  message:"Server is working"})})