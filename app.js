require('dotenv').config();
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const localhost    = process.env.PORT;
const connectionpassword = process.env.CONNECTIONPASSWORD;
const SECRET = process.env.SECRET;
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);

// To fix the DeprecationWarning
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false)

//.connect('mongodb://localhost/street-curator', {useNewUrlParser: true})

mongoose
  .connect(`${connectionpassword}`, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);
const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.locals.googleApiKey = process.env.GOOGLE_API_KEY;

// Express View engine setup
app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
hbs.registerPartials(__dirname + '/views/partials');

// default value for title local
app.locals.title = 'Street Curator | Street Art Exposure';

app.use(session({
  secret: `${SECRET}`,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 86400000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));

function mapUserSessionDataToHbs(req, res, next){
  if (req.session.currentUser) { 
    res.locals.loggedIn = true;
    res.locals.user = req.session.currentUser
  }          
  next();   
} 

function mapUserModeToHbs(req,res,next){
  if(req.session.artist){
    res.locals.artist = true;
    res.locals.tourist = false;
  }else if(req.session.tourist){
    res.locals.artist = false;
    res.locals.tourist = true;
  }
  next()
}

function protection(req, res, next){
  if(req.session.currentUser){
    next()
  }
  else{
    res.redirect('/login')
  }
}

app.use(mapUserModeToHbs)
app.use(mapUserSessionDataToHbs)
app.use('/', require('./routes/index'));
app.use('/', mapUserModeToHbs, require('./routes/about'));
app.use('/', require('./routes/user/signup'));
app.use('/', require('./routes/user/login'));
app.use('/', require('./routes/explore'));
app.use('/', require('./routes/map'))
app.use('/', require('./routes/artwork/details'));
app.use('/', require('./routes/artwork/add'));
app.use('/', require('./routes/artwork/like'));
app.use('/', require('./routes/artwork/review'));
app.use('/', require('./routes/user/editProfile'));
app.use('/', require('./routes/user/delete'));
app.use('/', require('./routes/user/logout'));
app.use('/', require('./routes/user/collection'));
app.use('/', require('./routes/user/profile'));
app.use('/', require('./routes/artwork/upload'));


module.exports = app;

app.listen(localhost, () => console.log(`App listening on ${localhost}`))
