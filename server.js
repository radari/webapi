//var db="webapi";

//var db="dbtest";

var port=3000;

var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var multer        = require('multer');
var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose      = require('mongoose');

var moment = require('moment');
var morgan = require('morgan');
var methodOverride = require('express-method-override');

mongoose.connect('mongodb://localhost/web');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
multer();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

require("./app/app.js")(app);
//require('./app/static/config.js')(db);



app.listen(port);
