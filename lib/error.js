var winston = require('winston');
winston.add(winston.transports.File, { filename: 'errors.log' });

exports.logger = function(err, req, res, next) {
    winston.log('error', err.toString(), { error: err});
    next(err);
}

exports.xhr = function(err, req, res, next) {
    if (req.xhr) {
        res.status(500);
        res.json({
            stat: 'error',
            error: err
        });
    } else {
        next(err);
    }
}

exports.common = function(err, req, res, next) {
    if (err.toString() == 'Error: 404') {
        exports.notfound(req, res, next);
    } else {
        res.status(500);
        res.render('500', {
            error: err
        })
    }
}

exports.notfound = function(req, res, next) {
    res.status(404);
    if (req.accepts('html')) {
        res.render('404', {
            url: req.url
        });
    } else if (req.accepts('json')) {
        res.json({
            stat: '404',
            error: 'not found'
        })
    }
}