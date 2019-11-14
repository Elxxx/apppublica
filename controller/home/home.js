const controller = {};

controller.homeDashboard = (req, res, next) => {
    if (req.session.loggedin) {
        res.render('home/home', { title: 'Plataforma Pública - VotNow' });
    } else {
        res.render('login/login', {
            error: 'Debes ingresar tus credenciales'
        });
    }
    res.end();
};

module.exports = controller;