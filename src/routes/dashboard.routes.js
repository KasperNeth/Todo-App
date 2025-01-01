const Router = require("express").Router;
const {dashBoardController}= require("../controllers/dashboard.controller")
const AuthMiddleWare = require("../middlewares/auth.middleware")

const route = Router()

route.get("/", AuthMiddleWare.AuthenticateUser, dashBoardController )

module.exports = route


