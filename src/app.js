const express = require("express");
const routes = require("./routes/index.routes")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const mongoose = require("mongoose");
const flash = require("connect-flash");
const dbConnection = require("./utils/db")
require("dotenv").config();


// Create an express application
const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

// Middleware
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

dbConnection.connectToMongoDB();

app.use(
  session({
    secret: process.env.SESSION_SECRET, 
    saveUninitialized: false,
    resave: false,
    cookie: { 
      maxAge: 60000 * 60 * 24,
      httpOnly: true,
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
    },
    store:MongoStore.create({
      client: mongoose.connection.getClient(),
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
  res.json({ message: 'Welcome to Todo Application' });
})






app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

