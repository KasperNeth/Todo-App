const Router = require("express").Router;
const AuthServiceController = require("../controllers/authUser.controller")


const route = Router();

route.post("/signup", AuthServiceController.SignUp)
route.post("/login", AuthServiceController.Login) 
route.post("/logout", AuthServiceController.Logout)

module.exports = route;