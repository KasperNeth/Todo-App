const express = require("express");
const routes = require("./src/routes/index.routes")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const flash = require("connect-flash");
const path = require("path");
const methodOverride = require("method-override")
require("dotenv").config();


// Create an express application
const app = express();

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, "src","views")); 




// Middleware
app.use(express.static(path.join(__dirname, "src","public")))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


app.use(
  session({
    secret: process.env.SESSION_SECRET, 
    saveUninitialized: false,
    resave: false,
    cookie: { 
      maxAge: 60000 * 60 * 24, // 1 day
      httpOnly: true,
      sameSite: true,
      secure: false,
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI
    })
  })
);


app.use(flash());

app.use((req, res, next) => {
  res.locals.messages = req.flash("message");
  next();
})

// Routes
app.use(routes);


app.get('/', (req, res) => {
  res.status(200).render('index')
})


// Catch-all for undefined routes
app.use((req, res, next) => {
  const errorMessage = "Route does not exist"
  res.status(404).render('error', { errorMessage });
});
app.get('/error', (req, res) => {
  const errorMessage = ""
  res.status(500).render('error', { errorMessage });
});









module.exports = app

