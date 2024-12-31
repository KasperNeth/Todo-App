const Router = require("express").Router;
const Authroutes = require("./auth.routes")
const Taskroutes = require("./task.routes")
const tasksdashboard = require("./dashboard.routes")

const route = Router()

route.use("/auth", Authroutes)
route.use("/tasks", Taskroutes)
route.use("/dashboard", tasksdashboard)

module.exports = route;
