const controller = {};

controller.logInAuth = (req, res, next) => {

};

controller.logIn = (req, res, next) => {
    res.render('login/login', { title: 'Plataforma Pública - VotNow' });
};


module.exports = controller;