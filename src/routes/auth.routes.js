const Router = require("express").Router;
const Authservice = require("../services/auth.service")


const route = Router

route.post("/signup")
route.post("/login")

module.exports = route;