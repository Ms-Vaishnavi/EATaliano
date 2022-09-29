require("dotenv").config()
const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts")
const mongoose = require("mongoose");
const session = require("express-session")
const flash = require("express-flash")
const MongoDbStore = require('connect-mongo')
const bodyParser = require("body-parser");

/*********Database connection**********/
const url = "mongodb://localhost:27017/Eataliano";
mongoose.connect(url, {useNewUrlParser: true}); 
const connection = mongoose.connection;

connection.once('open', () => {
  console.log("Database Connected!");
}).on('error', (err) => {
  console.log("Connection failed!");
})


/*********session config**********/
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store: MongoDbStore.create({
    mongooseConnection: connection,
    collection: 'sessions',
    mongoUrl: url
  }),
  saveUninitialized: false,
  cookie: {maxAge: 1000*60*60*24}
}))


app.use(flash())

app.use(expressLayout);

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())

app.use((req, res, next) => {
  res.locals.session = req.session
  next()
})

app.use(express.static(path.join(__dirname,"/public")))
app.set("views", path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs');




require('./routes/web')(app)


const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}`);
});
