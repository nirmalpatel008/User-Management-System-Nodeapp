const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const connectDB = require('./config/db');
const cors = require('cors');

//Load env variables
dotenv.config({ path: './config/config.env' });

const app = express();

//Connect to database
connectDB();

//Route Files
const users = require('./routes/users');
const task = require('./routes/task');

//Pass the global passport object on every request
//require('./config/passport')(passport);
require('./config/passport');
app.use(passport.initialize());

//Initializing the passport object on every request
app.use(passport.initialize());
//Initializing the passport object on every request

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:4200' }));

//Mount routers
app.use('/api/v1/users', users);
app.use('/api/v1/task', task);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App running in ${process.env.NODE_ENV} mode on  port ${PORT}`);
});
