const Router = require("express").Router;
const Authroutes = require("./auth.routes")


const route = Router()

route.use("/auth", Authroutes)


module.exports = route;
