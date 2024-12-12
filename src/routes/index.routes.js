const Router = require("express").Router;
const Authroutes = require("./auth.routes")
const Taskroutes = require("./task.routes")

const route = Router()

route.use("/auth", Authroutes)
route.use("/task", Taskroutes)
// route.use("/task", Taskroutes)



module.exports = route;
