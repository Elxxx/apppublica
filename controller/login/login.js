const controller = {};
const bcrypt = require('bcrypt');

controller.logInAuth = (req, res, next) => {
    req.getConnection((err, conn) => {
        const email = req.body.email;
        const pass = req.body.pass;
        conn.query('SELECT * FROM usuario WHERE correo = ?', [email], function(error, results, fields) {
            if (error) {
                res.send({
                    "code": 400,
                    "failed": "Ha ocurrido un error"
                })
            } else {
                if (results.length > 0) {
                    const pass2 = results[0].clavesecreta;
                    // bcrypt.compare(pass, pass2, function(err, respuesta) {
                    // if (respuesta) {
                    req.session.loggedin = true;
                    req.session.username = email;
                    res.redirect('/home');
                    //  } else {
                    //    res.render('login/login', {
                    //        error: 'Correo o contraseña incorrecta'
                    //    });
                    // }
                    // });
                } else {
                    res.render('login/login', {
                        error: 'El correo no existe'
                    });
                }
            }
        });

    });
};

controller.logIn = (req, res, next) => {
    res.render('login/login', { title: 'Plataforma Pública - VotNow' });
};

module.exports = controller;