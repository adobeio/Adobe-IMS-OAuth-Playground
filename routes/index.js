passport=require('passport');

module.exports = {
    '/auth': {
        middleware: [ passport.authenticate('adobe', {response_type: 'token' }) ],
        fn: function (req, res) {
            console.log("/auth opened");
        }
    },
    '/callback': {
        middleware: [ passport.authenticate('adobe', { failureRedirect: '/auth/adobe/login-failed.html' }) ],
        fn: function (req, res) {

            res.cookie('__Secure-access', req.user.accessToken,{secure:true});
            res.cookie('__Secure-refresh', req.user.refreshToken,{secure:true});
            res.redirect('/');
        }
    }
}