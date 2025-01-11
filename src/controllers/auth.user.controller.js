const Authservice = require("../services/auth.service");

const SignUp = async(req, res) => {
  const payload = req.body;
  const signupResponse = await Authservice.SignUp({
    username: payload.username,
    email: payload.email,
    password: payload.password
  }, {new: true});

  if(!signupResponse.success) {
    req.flash('error', signupResponse.message);
    return res.status(signupResponse.code).render("signup", {message: signupResponse.message});
  }

  const { user } = signupResponse.data;
  req.session.user = { _id: user._id, username: user.username, email: user.email };
  
  req.flash('success', signupResponse.message);
  return res.status(signupResponse.code).redirect("/dashboard");
};


const Login = async (req, res) => {
  const payload = req.body;

  const loginResponse = await Authservice.Login({
    email: payload.email,
    password: payload.password,
  });

  if (!loginResponse.success) {
    req.flash('error', loginResponse.message);
    return res.status(loginResponse.code).render("login", { message: loginResponse.message });
  }

  
  const { user } = loginResponse.data;
  req.session.regenerate((err) => {
    if (err) {
      req.flash('error', 'Session creation failed. Please try again.');
      return res.status(500).render("login", { message: "Session error. Please try again." });
    }

    req.session.user = { _id: user._id, username: user.username, email: user.email };
    req.flash('success', loginResponse.message);
    req.session.save((err) => {
      if (err) {
        req.flash('error', 'Failed to save session. Please try again.');
        return res.status(500).render("login", { message: "Failed to save session. Please try again." });
      }
      return res.status(loginResponse.code).redirect("/dashboard");
    });
  });
};


const Logout = (req, res) => {
  const flashMsg = "You have been logged out successfully.";

  req.session.destroy((err) => {
    if (err) {
      req.flash('error', 'Logout failed. Please try again.');
      return res.redirect('/dashboard');
    }

    res.clearCookie('connect.sid');
    return res.render('login', { message: flashMsg });
  });
};



module.exports = {SignUp, Login, Logout};
