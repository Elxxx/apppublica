const controller = {};

controller.error = (req, res, next) => {
    res.render('error/error', { title: 'Plataforma Pública - VotNow' });
};


module.exports = controller;