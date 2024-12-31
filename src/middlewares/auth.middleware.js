const AuthenticateUser = (req, res, next) => {
  if (req.session && req.session.user){
    req.user = req.session.user
    return next();
  }else{
    req.flash('message', 'You must be logged in to view this page');
    return res.redirect('/auth/login');
  }
}

module.exports = {
  AuthenticateUser
}