const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const homeRouter = require('./router/home/home');
const loginRouter = require('./router/login/login');
const errorRouter = require('./router/error/error');
const app = express();
const dotenv = require('dotenv');
const pug = require('pug');
const session = require('express-session');
dotenv.config();

// Sessiones 
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true,
    cookie: {
        expires: 600000
    }
}));

// vistas 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));

//Instancia BD
app.use(myConnection(mysql, {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
}, 'single'));

//Encode
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Carpeta publica
app.use(express.static(path.join(__dirname, 'public')));

//Rutas
app.use('/', homeRouter);
app.use('/', loginRouter);
app.use('/', errorRouter);

// Error 404 y Direccionamiento
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

app.listen(process.env.PORT, function() {
    console.log('Servidor Activo');
});