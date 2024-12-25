const session = require("express-session");
const Authservice = require("../services/auth.service")


const SignUp = async(req,res) =>{

 try{
  const payload = req.body;
  const signupResponse = await Authservice.SignUp({
    username: payload.username,
    email: payload.email,
    password: payload.password
  });
  if(!signupResponse.success){
    return res.status(signupResponse.code).render('/register', { message:signupResponse.message });
  }
  const { user } = signupResponse.data;
  session.user = user;
  req.session.userId = {id: user._id, username: user.username, email: user.email};
  return res.status(signupResponse.code).render("Hello", { user: user,  message: signupResponse.message });

 }
 catch (error){
  console.log(`Error in user controller: ${error.message}`)
  return res.status(500).render("error", { message: "An unexpected error occured. Please try again" });

 }
}



const Login = async(req, res) => {
  try{
    const payload = req.body;
    const loginResponse = await Authservice.Login({
      email: payload.email,
      password: payload.password
    });
    if(!loginResponse.success){
      return res.status(loginResponse.code).render('/login', { message:loginResponse.message });
    }
    const { user } = loginResponse.data;
    session.user = user;
    req.session.userId = {id: user._id, username: user.username, email: user.email};
    return res.status(loginResponse.code).render("Hello", { user: user,  message: loginResponse.message });
  }
  catch (error){
    console.log(`Error in user controller: ${error.message}`)
    return res.status(500).render("error", { message: "An unexpected error occured. Please try again" });
  }
}
 
const Logout = (req, res) => {
  req.session.destroy((err) => {
    if(err){
      return res.status(500).render("error", { message: "An unexpected error occured. Please try again" });
    }
    res.clearCookie('sid');
    return res.status(200).redirect("/login", { message: "You have been logged out" });
  });

}


module.exports = {SignUp, Login, Logout}