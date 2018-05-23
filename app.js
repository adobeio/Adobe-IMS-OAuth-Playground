// app.js
/**
 * Module dependencies.
 */
var fs = require('fs');
//Certificate for https
var https_options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt'),
    requestCert: false,
    rejectUnauthorized: false
};
var routescan = require('express-routescan');
var routes = require('./routes');
var cookieParser = require('cookie-parser');
var express = require('express');
var app = express();
var server = require('https').createServer(https_options,app);
var io = require('socket.io')(server);
var request = require('request');
passport = require('passport');
var AdobeStrategy = require('passport-adobe-oauth2').Strategy;
var port = process.env.PORT || 3000;


app.use(express.static(__dirname + '/public'));


server.listen(port);

var consoleClientID, consoleClientSecret, consoleAuthCode, consoleAccessToken, consoleAuthURL, consoleTokenURL,
    consoleScopes;


io.on('connection', function (socket) {
    socket.emit('welcome', {});
    socket.emit('getCookie',{});


    socket.on('getAuthCode', function (consoleCredentials) {

        consoleClientID = consoleCredentials.clientID;
        consoleAuthURL = consoleCredentials.authEndpoint;
        consoleScopes = consoleCredentials.scope;
        consoleClientSecret=consoleCredentials.clientSecret;
        consoleTokenURL=consoleCredentials.tokenEndpoint;

        passport.serializeUser(function(user, done) {
            done(null, user);
        });

        passport.deserializeUser(function(obj, done) {
            done(null, obj);
        });

        passport.use(new AdobeStrategy({
                authorizationURL:consoleAuthURL,
                tokenURL:consoleTokenURL,
                clientID: consoleClientID,
                clientSecret: consoleClientSecret,
                scope: consoleScopes
            },
            //verify function below
            function(accessToken, refreshToken, profile, done) {
                // asynchronous verification, for effect...
                socket.emit("accessToken",{accessToken:accessToken,refreshToken:refreshToken});
                var tokens={accessToken:accessToken, refreshToken:refreshToken};
                return done(null,tokens);
            }
        ));

        socket.emit('openUrl',{url:'/auth'});

    });
});

app.use(cookieParser('secret'));
app.use(passport.initialize());
app.use(passport.session());

routescan(app);
