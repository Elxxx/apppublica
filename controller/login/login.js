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

                    if (results[0].clavesecreta == pass) {
                        res.send({
                            "code": 200,
                            "success": "Autentificación correcta"
                        });
                    } else {
                        res.send({
                            "code": 204,
                            "success": "Email o contraseña no corresponden"
                        });
                    }
                } else {
                    res.send({
                        "code": 204,
                        "success": "El correo no existe"
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