const Router = require("express").Router;
const AuthServiceController = require("../controllers/auth.user.controller")


const route = Router();

route.get("/signup", (req, res) =>{
  res.render("signup", {message: ""})
})

route.get("/login", (req, res) => {
 // Redirect to dashboard if session is active
 if (req.session.user) {
  return res.redirect("login");
}

// Retrieve and pass flash message to the template
const message = req.flash("message") || "";
res.render("login", { message });
})



route.post("/signup", AuthServiceController.SignUp)
route.post("/login", AuthServiceController.Login) 
route.post("/logout", AuthServiceController.Logout);

module.exports = route;