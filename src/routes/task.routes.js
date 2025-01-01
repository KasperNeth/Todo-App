const Router = require("express").Router;
const AuthMiddleware = require("../middlewares/auth.middleware")
const TaskServiceController = require("../controllers/task.controller")


const route = Router()

route.post("/", AuthMiddleware.AuthenticateUser, TaskServiceController.CreateTask);
route.get("/", AuthMiddleware.AuthenticateUser, TaskServiceController.GetAllTasks);
route.get("/:taskId", AuthMiddleware.AuthenticateUser, TaskServiceController.GetTask);
route.put("/:taskId", AuthMiddleware.AuthenticateUser, TaskServiceController.UpdateTask);
route.post("/:taskId/:action", AuthMiddleware.AuthenticateUser, TaskServiceController.DeleteTask);;


module.exports = route