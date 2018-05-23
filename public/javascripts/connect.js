$(function () {
    'use strict';

    // initiate socket
    var socketUrl = window.location.protocol + '//' + window.location.host;
    var socket;

    socket = io.connect(socketUrl);
    socket.on('welcome', function () {
        console.log("connected!");
    });

    socket.on('message', function (msg) {
        if (msg.status == ('fail')) {
            $('.alert#' + msg.id).text(msg.text).show();
        }
    });

    function readCookie(name) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();

    }

    function eraseCookie(name) {
        document.cookie = name + '=; Max-Age=0';
    }

    socket.on('getCookie', function () {
        var access = readCookie('__Secure-access');
        var refresh = readCookie('__Secure-refresh');
        if (access !== undefined) {
            $('a[href="#tokens"]').click();
            $("#accessToken").text(access);
            $("#refreshToken").text(refresh);
            $(".alert#3").text("Tokens generated successfully!").fadeTo(2000, 500).slideUp(500, function () {
                $(".alert#3").slideUp(500);
            });
            eraseCookie('access');
            eraseCookie('refresh');
        }
    });

    socket.on('openUrl', function (link) {
        window.open(link.url, "_self");
    });

    function listen(uri) {
    }

    $("#consoleCredentials").submit(function (event) {

        $('.alert').hide();

        event.preventDefault();

        var authEndpoint = $("input#authEndpoint").val();
        var clientID = $("input#clientID").val();
        var scope = $("input#scope").val();
        var tokenEndpoint = $("input#tokenEndpoint").val();
        var clientSecret = $("input#clientSecret").val();

        socket.emit('getAuthCode', {authEndpoint: authEndpoint, clientID: clientID, scope: scope, tokenEndpoint:tokenEndpoint, clientSecret:clientSecret});
    });

});