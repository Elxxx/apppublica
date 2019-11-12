const controller = {};

controller.homeDashboard = (req, res, next) => {
    res.render('home/home', { title: 'Plataforma Pública - VotNow' });
};

module.exports = controller;